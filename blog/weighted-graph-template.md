---
Title: 带权图模板
Slug: weighted-graph-template
Tags: [ACM, BFS, DFS, ForwardStar, Functor]
Date: 2013-12-22 23:40
---

使用前向星方法（应该是吧？我着实不确定这种我不知道从哪看到之后一直在用的存储方法究竟叫什么= =）存储的带权图，实现了通用的DFS和BFS算法，可以通过函数对象使用。

正好这两天复习算法，所以整理了一下。有些时候有这么一个模板还是挺方便的说。

直接上代码了

```c++
struct ForwardStarWGraph;
struct Node;

struct CallbackFunctor
{
    virtual bool shouldExtend(ForwardStarWGraph& graph, Node& toExtend) = 0;
    virtual bool operator() (ForwardStarWGraph& graph, Node& curr) = 0;
};

struct Node
{
    int i;
    int from;
    int edge;
    int totalWight;
    vector<int> path;
};

const int N = 20; // max vertex conut
const int M = N*N; // max edge count

struct ForwardStarWGraph
{
    int to[M], nxt[M], head[N];
    int wight[M];
    int ecnt;
    // Actual vertex number
    int n;

    void graphInit(int nn, int m)
    {
        ecnt = 0;
        n = nn;
        memset(head, -1, sizeof(head));
    }

    // Add an edge, vertex counts from 0
    void addEdge(int u, int v, int w)
    {
        to[ecnt] = v;
        wight[ecnt] = w;
        nxt[ecnt] = head[u];
        head[u] = ecnt;
        ecnt++;
    }

    // Add an undirectional edge
    void addBiEdge(int u, int v, int w)
    {
        addEdge(u, v, w);
        addEdge(v, u, w);
    }

    int wightBetween(int a, int b)
    {
        if(a == b)
            return 0;
        for(int e = head[a]; e!= -1; e = nxt[e])
        {
            if(to[e] == b)
                return wight[e];
        }
        return -1;
    }

    void bfs(CallbackFunctor& func)
    {
        queue<Node> Q;

        Node tem;
        tem.i = 0;
        tem.from = -1;
        tem.edge = -1;
        tem.totalWight = 0;
        tem.path.push_back(0);
        Q.push(tem);

        while(!Q.empty())
        {
            Node t = Q.front(); Q.pop();

            func(*this, t);

            for(int e = head[t.i]; e!= -1; e = nxt[e])
            {
                if(to[e] == t.from)
                    continue;
                Node t2;
                t2.i = to[e];
                t2.from = t.i;
                t2.edge = e;
                t2.totalWight = t.totalWight + wight[e];
                t2.path = t.path; t2.path.push_back(t2.i);
                if(func.shouldExtend(*this, t2))
                {
                    Q.push(t2);
                }
            }
        }
    }

    void dfs(CallbackFunctor& func)
    {
        stack<Node> Q;

        Node tem;
        tem.i = 0;
        tem.from = -1;
        tem.edge = -1;
        tem.totalWight = 0;
        tem.path.push_back(0);
        Q.push(tem);

        while(!Q.empty())
        {
            Node t = Q.top(); Q.pop();

            func(*this, t);

            for(int e = head[t.i]; e!= -1; e = nxt[e])
            {
                if(to[e] == t.from)
                    continue;
                Node t2;
                t2.i = to[e];
                t2.from = t.i;
                t2.edge = e;
                t2.totalWight = t.totalWight + wight[e];
                t2.path = t.path; t2.path.push_back(t2.i);
                if(func.shouldExtend(*this, t2))
                {
                    Q.push(t2);
                }
            }
        }
    }
};
```

附带一个测试小程序

```c++
int n, m;
ForwardStarWGraph g;

struct Routine : CallbackFunctor
{
    virtual bool shouldExtend (ForwardStarWGraph& graph, Node& toExtend)
    {
        return true;
    }

    virtual bool operator() (ForwardStarWGraph& graph, Node& curr)
    {
        cout<<curr.i+1<<endl;
    }
};

int main()
{
#ifdef ACM_LOCAL
    freopen("input.txt", "r", stdin);
    //freopen("output.txt", "w", stdout);
#endif // ACM_LOCAL
    while(scanf("%d %d", &n, &m) != EOF)
    {
        g.graphInit(n, m);
        for(int i = 0; i!= m; i++)
        {
            int a, b, w;
            scanf("%d%d%d", &a, &b, &w);
            g.addBiEdge(a-1, b-1, w);
        }
        Routine routine;
        g.bfs(routine);
    }


#ifdef ACM_LOCAL
    printf("Used time: %lf\n", clock() / (double) CLOCKS_PER_SEC);
#endif // ACM_LOCAL
    return 0;
}
```