---
Title: USACO 3.1.1 Agri-Net
Tags: [ACM, USACO, MST, Kruskal, Union-Find]
Date: 2013-02-15 20:49
---

标准的最小生成树，用了Kruskal算法，写了一个可以以后用的并查集类。

```c++
/*
ID: xjtuacm1
PROG: agrinet
LANG: C++
*/
#include<iostream>
#include<stack>
#include<cstring>
#include<cstdio>
#include<queue>
#include<algorithm>
#include<set>
#include<map>
#include<vector>
#include<cmath>
using namespace std;
const int MAXDIS = 100000 + 10;
const int N = 100;
const int M = N * (N - 1) / 2;

int n, m;
int e;
int u[M], v[M], w[M];

int wr[M];

void initGraph()
{
    e = 0;
}

void addEdge(int x, int y, int cost)
{
    u[e] = x;
    v[e] = y;
    w[e++] = cost;
}

class UnionFind
{
    int n;
    int fa[N];
    int r[N];

public:
    UnionFind(int nn)
        : n(nn)
    {
        init();
    }

    void init()
    {
        memset(r, 0, sizeof(r));
        for(int i = 0; i!= n; i++)
            fa[i] = i;
    }

    int Find(int x)
    {
        if(x != fa[x])
        {
            fa[x] = Find(fa[x]);
        }
        return fa[x];
    }

    void Union(int x, int y)
    {
        Link(Find(x), Find(y));
    }
private:
    void Link(int x, int y)
    {
        if(r[x] > r[y])
        {
            fa[y] = x;
        }
        else
        {
            fa[x] = y;
            if(r[x] == r[y])
                r[y]++;
        }
    }
};

bool cmp(int a, int b)
{
    return w[a] < w[b];
}

int kruskal()
{
    UnionFind uf(n);
    for(int i = 0; i!= m; i++)
        wr[i] = i;
    int ret = 0;

    sort(wr, wr+m, cmp);

    for(int i = 0; i!= m; i++)
    {
        int ed = wr[i];
        if(uf.Find(u[ed]) != uf.Find(v[ed]))
        {
            ret += w[ed];
            uf.Union(u[ed], v[ed]);
        }
    }

    return ret;
}

int main(int argc, char *argv[])
{
#ifdef ACM
    freopen("in", "r", stdin);
#else
    freopen("agrinet.in", "r", stdin);
    freopen("agrinet.out", "w", stdout);
#endif // ACM

    scanf("%d", &n);
    m = n * (n - 1) / 2;
    for(int i = 0; i!= n; i++)
        for(int j = 0; j!= n; j++)
        {
            int t;
            scanf("%d", &t);
            if(i > j)
                addEdge(i, j, t);
        }

    printf("%d\n", kruskal());

    return 0;
}
```