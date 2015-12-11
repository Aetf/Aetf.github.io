---
Title: USACO 2.4.4 Bessie Come Home
Tags: [ACM, USACO, Dijkstra]
Date: 2013-02-15 20:40
---

带权边的Dijkstra

```c++
/*
ID: xjtuacm1
PROG: comehome
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
using namespace std;
const int INF = 0x3f3f3f3f;
const int M = 10000;
const int N = 52;

// Graph structure
int n;
int to[M], nxt[M], head[N];
int w[M];
bool vis[N];
int e;
int dist[N]; // Distance array
struct cmp
{
    bool operator() (int a, int b)
    {
        return dist[a] > dist[b];
    }
};

void init()
{
    memset(vis, false, sizeof(vis));
    memset(head, -1, sizeof(head));
    e = 0;
}
void addEdge(int u, int v, int c)
{
    to[e] = v;
    nxt[e] = head[u];
    w[e] = c;
    head[u] = e++;
}

void addBiEdge(int u, int v, int c)
{
    addEdge(u, v, c);
    addEdge(v, u, c);
}

void dijkstra(int src)
{
    // Reset distance array
    memset(vis, false, sizeof(vis));
    for(int i = 0; i!= n; i++)
        dist[i] = INF;

    priority_queue<int, vector<int>, cmp> que;
    vis[src] = true;
    dist[src] = 0;
    que.push(src);
    int pnt = src;
    for(int i = 1; i!=n; i++)
    {
        for(int j = head[pnt]; j!= -1; j = nxt[j])
        {
            int v = to[j];
            if(!vis[v] && dist[pnt] + w[j] < dist[v])
            {
                dist[v] = dist[pnt] + w[j];
                que.push(v);
            }
        }
        while(!que.empty() && vis[que.top()])
            que.pop();
        if(que.empty())
            break;

        pnt = que.top(); que.pop();
        vis[pnt] = true;
    }
}

set<char> cows;
int r[N];
bool indirectCmp(int a, int b)
{
    return dist[a] < dist[b];
}

int toIdx(char ch)
{
    if(ch != tolower(ch))
        return ch - 'A';
    else
        return ch - 'a' + 26;
}
char toChar(int idx)
{
    if(idx < 26)
        return idx + 'A';
    else
        return idx - 26 + 'a';
}

int main(int argc, char *argv[])
{
    freopen("comehome.in", "r", stdin);
#ifndef USACO
    freopen("comehome.out", "w", stdout);
#endif // USACO

    int p;
    scanf("%d\n", &p);

    n = N;
    init();

    while(p--)
    {
        char f, t;
        int c;
        scanf("%c %c %d\n", &f, &t, &c);
        if(f == t)
            continue;

        bool flag = false;
        for(int edge = head[toIdx(f)]; edge != -1; edge = nxt[edge])
            if(to[edge] == (toIdx(t)))
        {
            w[edge] = min(w[edge], c);
            flag = true;
            break;
        }
        for(int edge = head[toIdx(t)]; edge != -1; edge = nxt[edge])
            if(to[edge] == (toIdx(f)))
        {
            w[edge] = min(w[edge], c);
            flag = true;
            break;
        }
        if(flag)
            continue;

        addBiEdge(toIdx(f), toIdx(t), c);
    }

    dijkstra(toIdx('Z'));

    for(int i = 0; i!= n; i++)
        r[i] = i;

    sort(r, r+n, indirectCmp);
    for(int i = 1; i!= n; i++)
    {
        if(r[i] < 26)
        {
            printf("%c %d\n", toChar(r[i]), dist[r[i]]);
            break;
        }
    }

    return 0;
}
```