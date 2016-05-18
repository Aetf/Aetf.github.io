---
Title: USACO 2.3.1 Longest Prefix
Tags: [ACM,USACO,Trie,DP]
Date: 2013-02-05 14:44
Gittime: off
---
题目意思就是给定1～200个短的Primitive (长度1～10)，以及一个长字符串 (长度200,000以内)，需要找出由这些Primitive任意重复连接形成的后者的最长前缀。

DP + Trie

设长字符串为seq，基本思路是若seq[0...i]是满足要求的前缀，那么seq[0...i+len]也是满足要求的前缀，len是各个Primitive的长度。

然后就是用Trie优化一下判断seq[i...i+len]是否在Primitive集合的过程。

```cpp
/*
ID: xjtuacm1
PROG: prefix
LANG: C++
*/
#include<iostream>
#include<stack>
#include<cstring>
#include<cstdio>
#include<queue>
#include<algorithm>
#include<map>
#include<set>
using namespace std;

const int PRISIZE = 205;
const int PRILEN = 10 + 1;
const int SEQLEN = 200005;
const int LINELEN = 76 + 2;

struct _trie
{
    int next[26];
    int cnt;
} trie[PRISIZE * PRILEN];
int trieNodeCnt;

int trieInit()
{
    memset(trie, 0, sizeof(trie));
    trieNodeCnt = 1;

    return 0; // trie tree's root
}

void trieAdd(int root, const char *str)
{
    int p = root;
    while(*str)
    {
        if(trie[p].next[*str - 'A'] == 0)
        {
            trie[p].next[*str - 'A'] = trieNodeCnt++;
        }
        p = trie[p].next[*str - 'A'];
        str++;
    }
    trie[p].cnt += 1;
}

bool trieSearch(int root, const char* str, int len)
{
    int p = root;
    for(int i = 0; i!= len; i++)
    {
        if(trie[p].next[str[i] - 'A'] == 0)
            return false;

        p = trie[p].next[str[i] - 'A'];
    }

    return trie[p].cnt > 0;
}

char seq[SEQLEN];
int seqlen = 0;
bool reach[SEQLEN]; // reach[i] =  if seq[0...i) (length = i) can be composed from primitives.

int main(int argc, char *argv[])
{
    freopen("prefix.in", "r", stdin);
#ifndef USACO
    freopen("prefix.out", "w", stdout);
#endif // USACO

    int root = trieInit(); // root = 0
    memset(reach, false, sizeof(reach));

    char temp[PRILEN];
    for(int i = 0; i!= PRISIZE; i++)
    {
        scanf("%s", temp);
        if(temp[0] == '.')
            break;

        trieAdd(root, temp);
    }

    while(true)
    {
        scanf("%s", seq + seqlen);
        int len = strlen(seq + seqlen);
        if(len == 0)
            break;

        seqlen += len;
    }

    for(int i = 1; i!= PRILEN; i++)
    {
        reach[i] = trieSearch(root, seq, i);
    }

    for(int i = 0; i!= seqlen; i++)
    {
        if(reach[i])
        {
            for(int j = 1; j!= PRILEN; j++)
            {
                if(trieSearch(root, seq + i, j))
                    reach[i + j] = true;
            }
        }
    }

    for(int i = seqlen ; i != 0; i--)
    {
        if(reach[i])
        {
            printf("%d\n", i);
            return 0;
        }
    }

    printf("0\n");
    return 0;
}
```

BTW，这是我第一次写Trie，感觉还挺顺手的。
