const test = require('ava');
const fs = require('fs/promises');
const { getHexo } = require('./helpers');
const SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler();

const saveHtml = false;

test.before(async t => {
    t.context.hexo = await getHexo();
})

async function renderMarkdown(t, text) {
    const { hexo } = t.context;
    const html = await hexo.render.render({
        text,
        engine: 'markdown',
    });
    if (saveHtml) {
        const forview = `<!doctype html>
            <html lang=en>
            <head>
            <meta charset=utf-8>
            <link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css">
            <script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js"></script>
            <title>blah</title>
            </head>
            <body><div><pre><code>${text}</code></pre></div><div>${html}</div>`;
        fs.writeFile(`/dev/shm/aetf/workspace/${t.title}.html`, forview);
    }
    t.snapshot(html);
}

test('single character inline equation', renderMarkdown, '$a$');
test("inline equation with single greek character", renderMarkdown, "$\\varphi$");
test("simple equation starting and ending with numbers.", renderMarkdown, "$1+1=2$");
test("simple equation including special html character.", renderMarkdown, "$1+1<3$");
test("equation including backslashes.", renderMarkdown, "$a \\backslash$");

test("inline fraction", renderMarkdown, "$\\frac{1}{2}$");
test("inline column vector", renderMarkdown, "$\\begin{pmatrix}x\\\\y\\end{pmatrix}$");
test("inline bold vector notation", renderMarkdown, "$\\tilde{\\bold{e}}_\\alpha$");
test("exponentiation", renderMarkdown, "$a^{b}$");
test("conjugate complex", renderMarkdown, "$a^\*b$ with $a^\*$");

test("underline tests", renderMarkdown, "$$c{\\bold e}_x = a{\\bold e}_\\alpha - b\\tilde{\\bold e}_\\alpha$$");
test("consecutive inline equations.", renderMarkdown, "$x$ $y$");
test("inline equation after '-' sign in text.", renderMarkdown, "so-what is $x$");

test("non-numeric character before opening $ or after closing $ or both is allowed.", renderMarkdown, "a$1+1=2$\n$1+1=2$b\nc$x$d");
test("use of currency symbol after number", renderMarkdown, "You get 3$ if you solve $1+2$");
test("use of currency symbol before number", renderMarkdown, "If you solve $1+2$ you get $3");
test("following dollar character '$' is allowed.", renderMarkdown, "$x$ $ ");
test("escaped dollars '\\$' are interpreted as dollar '$' characters.", renderMarkdown, "\\$1+1=2$");

test("inline equation following code section.", renderMarkdown, "`code`$a-b$");
test("inline equation followed by block equation.", renderMarkdown, "${e}_x$\n\n$$e_\\alpha$$");

test("single block equation, greek index", renderMarkdown, "$$e_\\alpha$$");
test("display equation on its own single line.", renderMarkdown, "$$1+1=2$$");
test("display equation with line breaks.", renderMarkdown, "$$\n1+1=2\n$$");
test("multiline equation.", renderMarkdown, "$$\\begin{matrix}\n f & = & 2 + x + 3 \\\\\n & = & 5 + x \n\\end{matrix}$$");
test("vector equation.", renderMarkdown, "$$\\begin{pmatrix}x_2 \\\\ y_2 \\end{pmatrix} = \n\\begin{pmatrix} A & B \\\\ C & D \\end{pmatrix}\\cdot\n\\begin{pmatrix} x_1 \\\\ y_1 \\end{pmatrix}$$");
test("display equation with equation number.", renderMarkdown, "$$f(x) = x^2 - 1$$ (1)");

test("equation following code block.", renderMarkdown, "```\ncode\n```\n$$a+b$$");
test("numbered equation following code block.", renderMarkdown, "```\ncode\n```\n$$a+b$$(1)");

test("equations in list.", renderMarkdown, "1. $1+2$\n2. $2+3$\n    1. $3+4$");
test("inline sum.", renderMarkdown, "$\\sum\_{i=1}^n$");
test("sum without equation number.", renderMarkdown, "$$\\sum\_{i=1}^n$$");

test("sum with equation number.", renderMarkdown, "$$\\sum\_{i=1}\^n$$ \(2\)");
test("equation number always vertically aligned.", renderMarkdown, "$${\\bold e}(\\varphi) = \\begin{pmatrix}\n\\cos\\varphi\\\\\\sin\\varphi\n\\end{pmatrix}$$ (3)");
test("inline equations in blockquote.", renderMarkdown, "> see $a = b + c$ \n> $c^2=a^2+b^2$ (2) \n> $c^2=a^2+b^2$ ");
test("display equation in blockquote.", renderMarkdown, "> formula\n>\n> $$ a+b=c$$ (2)\n>\n> in blockquote. ");

// these result in errors
test("new line in blockquote block.", renderMarkdown, "> \$\$ a+b\n=c\$\$");
test("empty line between text and display formula is required.", renderMarkdown, "some text\n \$\\$a+b=c\$\$");
test("whitespace character after opening $\nor before closing $ is not allowed.", renderMarkdown, "$ $\n$ x$\n$x $");
test("line break in inline equation is not allowed.", renderMarkdown, "$1+1=\n2$");
