---
title: USACO 2.4.2 Overfencing
tags: [ACM, USACO, BFS]
date: 2013-02-15 20:33
---
题意是给你一个迷宫，有两个出口，找出最长的从迷宫内任意一点到出口的最短距离。

一开始想到的是dijkstra，在两个出口分别运行一次，取每个点到两个出口距离中最短的，再去其中最大的即可。

然后想到其实分别从两个出口作BFS，标注每个点的距离即可。

```cpp
/*
ID: xjtuacm1
PROG: maze1
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
const int W = 38;
const int H = 100;
const int INF = 0x3f3f3f3f;

const int dir[4] = { 1, 2, 4, 8};

int stage[H][W];
int color[H][W];
int h, w;

struct Point
{
    int x, y;
    Point(int xx = 0, int yy = 0) :x(xx), y(yy) {}
    bool operator<(const Point& rhs) const
    {
        if(x == rhs.x)
            return y < rhs.y;
        return x < rhs.x;
    }

    bool connect(int d) const
    {
        return !(stage[x][y] & dir[d]);
    }

    Point next(int d) const
    {
        switch(dir[d])
        {
        case 1:
            return Point(x, y-1);
        case 2:
            return Point(x-1, y);
        case 4:
            return Point(x, y+1);
        case 8:
            return Point(x+1, y);
        }
        return Point();
    }
};

void init()
{
    for(int i = 0; i!= h; i++)
        for(int j = 0; j!= w; j++)
        {
            stage[i][j] = 0xF;
            color[i][j] = INF;
        }
}

void addEdge(const Point& u, const Point& v)
{
    const Point& a = u<v ? u : v;
    const Point& b = u<v ? v : u;
    if(a.x == b.x)
    {
        stage[a.x][a.y] ^= 1<<2;
        stage[b.x][b.y] ^= 1;
    }
    if(a.y == b.y)
    {
        stage[a.x][a.y] ^= 1<<3;
        stage[b.x][b.y] ^= 1<<1;
    }
}

void bfs(const Point& src)
{
    color[src.x][src.y] = 1;
    queue<pair<Point, int> > que;
    que.push(make_pair(src, 1));

    while(!que.empty())
    {
        Point pt = que.front().first;
        int dis = que.front().second;
        que.pop();

        for(int i = 0; i!= 4; i++)
        {
            if(pt.connect(i))
            {
                Point nxt = pt.next(i);
                if(dis+1 < color[nxt.x][nxt.y])
                {
                    color[nxt.x][nxt.y] = dis + 1;
                    que.push(make_pair(nxt, color[nxt.x][nxt.y]));
                }
            }
        }
    }
}

int main(int argc, char *argv[])
{
    freopen("maze1.in", "r", stdin);
#ifndef USACO
    freopen("maze1.out", "w", stdout);
#endif // USACO


    scanf("%d %d", &w, &h); getchar();
    init();

    Point extCell[2];
    int extCnt = 0;

    char line[2*W + 2];

    // first line
    gets(line);
    for(int i = 0; i!= strlen(line); i++)
    {
        if(line[i] == ' ')
            extCell[extCnt++] = Point(0, (i - 1) / 2);
    }
    for(int i = 0; i!= 2 * h - 1; i++)
    {
        gets(line);
        if(i & 1)
        {
            for(int j = 0; j != strlen(line); j++)
            {
                if(line[j] == ' ')
                {
                    addEdge(Point((i-1)/2, (j-1)/2),
                            Point((i+1)/2, (j-1)/2) );
                }
            }
        }
        else
        {
            if(line[0] == ' ')
            {
                extCell[extCnt++] = Point(i / 2, 0);
            }
            if(line[strlen(line) - 1] == ' ')
            {
                extCell[extCnt++] = Point(i / 2, w - 1);
            }
            for(int j = 2; j< strlen(line) - 1; j+= 2)
            {
                if(line[j] == ' ')
                {
                    addEdge(Point(i/2, j/2 - 1),
                            Point(i/2, j/2) );
                }
            }
        }
    }
    // last line
    gets(line);
    for(int i = 0; i!= strlen(line); i++)
    {
        if(line[i] == ' ')
            extCell[extCnt++] = Point(h-1, (i - 1) / 2);
    }

    bfs(extCell[0]);
    bfs(extCell[1]);

    int m = 0;
    for(int i = 0; i!= h; i++)
        for(int j = 0; j!= w; j++)
        m = max(m, color[i][j]);

    printf("%d\n", m);


    return 0;
}
```