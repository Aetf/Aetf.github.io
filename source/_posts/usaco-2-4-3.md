---
title: USACO 2.4.3 Cow Tours
tags: [ACM, USACO, DFS, Floyd]
date: 2013-02-15 20:46
---

floyd + dfs染色。

重点是添加新的边之后的field的直径等于

1.原来两个field的直径
2.新的边长加从它的两个端点可以延伸的最大长度

这其中的最大值。

```cpp
/*
ID: xjtuacm1
PROG: cowtour
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
const int N = 150;
const double DINF = 1e30;

struct Point
{
    int x, y;
} pes[N];

int adj[N][N];
int color[N];

double dis[N][N];
double maxDis[N];
double dia[N];
int n;

void floodfill(int cur, int tag)
{
    color[cur] = tag;
    for(int i = 0; i!= n; i++)
    {
        if(adj[cur][i] && color[i] == -1)
        {
            floodfill(i, tag);
        }
    }
}

int find_component()
{
    int cnt = 0;
    for(int i = 0; i < n; i++)
        if(color[i] == -1)
            floodfill(i, cnt++);
    return cnt;
}

double dist(int a, int b)
{
    if(!adj[a][b])
        return DINF;

    return sqrt((pes[a].x - pes[b].x) * (pes[a].x - pes[b].x)
                + (pes[a].y - pes[b].y) * (pes[a].y - pes[b].y));
}

void floyd()
{
    for(int i = 0; i!= n; i++)
        for(int j = 0; j!= n; j++)
            dis[i][j] = dist(i, j);

    for(int k = 0; k!= n; k++)
        for(int i = 0; i!= n; i++)
            for(int j = 0; j!= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
}

int main(int argc, char *argv[])
{
#ifdef ACM
    freopen("in", "r", stdin);
#else
    freopen("cowtour.in", "r", stdin);
    freopen("cowtour.out", "w", stdout);
#endif // ACM

    scanf("%d\n", &n);
    for(int i = 0; i!= n; i++)
    {
        scanf("%d %d\n", &pes[i].x, &pes[i].y);
    }
    for(int i = 0; i!= n; i++)
    {
        char line[N + 1];
        gets(line);
        for(int j = 0; j!= n; j++)
        {
            adj[i][j] = (line[j] == '0'? 0 : 1);

            dis[i][j] = dist(i, j);

        }
    }

    memset(color, -1, sizeof(color));
    int ncom = find_component();
    floyd();

    for(int i = 0; i!= ncom; i++)
        dia[i] = 0;

    for(int i = 0; i!= n; i++)
    {
        maxDis[i] = 0;
        for(int j = 0; j!= n; j++)
        {
            if(i!= j && color[i] == color[j])
            {
                maxDis[i] = max(maxDis[i], dis[i][j]);
            }
        }

        dia[color[i]] = max(dia[color[i]], maxDis[i]);
    }

    double diameter = DINF;
    for(int i = 0; i!= n; i++)
        for(int j = 0; j!= n; j++)
    {
        if(color[i] == color[j])
            continue;

        double d1 = 0;
        double d2 = 0;
        for(int k = 0; k!= n; k++)
        {
            if(i != k && color[i] == color[k])
                d1 = max(d1, dis[i][k]);

            if(j != k && color[j] == color[k])
                d2 = max(d2, dis[j][k]);
        }

        double dist = sqrt( (pes[i].x - pes[j].x) * (pes[i].x - pes[j].x)
                           + (pes[i].y - pes[j].y) * (pes[i].y - pes[j].y) );

        diameter = min(diameter,
                       max(dist + d1 + d2,
                           max(dia[color[i]], dia[color[j]])));
    }

    printf("%.6lf\n", diameter);

    return 0;
}
```

BTW，对复杂代码的掌控能力还是不够。。虽然这道题有了完整思路，但是写不出完整的代码，最后还是参考了题解才写完...