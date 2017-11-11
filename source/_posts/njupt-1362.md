---
title: NJUPT 1362 汽车加油行驶问题
tags: [ACM, NJUPT, NoteKeeping]
date: 2013-12-23 15:23
---

嗯。。还是算法复习用到了的，竟然还有OJ上有这道题，所以过了一下

参考是[Candesoft-BLOG](http://www.candesoft.com/blog/?p=181)

大体思路就是首先分点，记录同一位置不同剩余油量的花费。

```cpp lineno=False
int cost[N+1][N+1][K+1];
```

然后从起点开始一点一点扩展，分别判断有和没有加油站的情况走到4个方向上是否是更优的花费。有点儿类似Dijkstra最短路的感觉。

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <cstdio>
#include <cmath>
using namespace std;
#define ll long long
//template<typename T>
//inline T min(const T& a, const T& b) { return a < b? a:b;}
//template<typename T>
//inline T max(const T& a, const T& b) { return a > b? a:b;}

const int N = 100;
const int K = 10;
const int dirs[][2] = {{ -1, 0}, {1, 0}, {0, -1}, {0, 1}};

struct Position
{
    int x, y, k;
};

queue<Position> que;
int cm[N + 1][N + 1][K + 1];
int map[N + 1][N + 1];
int inqueue[N + 1][N + 1][K + 1];
int n, k, a, b, c;

bool isValid(int x, int y)
{
    if(x < 1
            || x > n
            || y < 1
            || y > n)
    {
        return false;
    }
    return true;
}

void init()
{
    memset(cm, -1, sizeof(cm));
    cm[1][1][k] = 0;
    memset(map, 0, sizeof(map));
    memset(inqueue, 0, sizeof(inqueue));
    while(!que.empty())
    {
        que.pop();
    }
}

void checkBetter(int x, int y, int k, int cost)
{
    // If is better to go to (x, y) from (p.x, p.y)
    if(cm[x][y][k] == -1 || cm[x][y][k] > cost)
    {
        cm[x][y][k] = cost;
        if(inqueue[x][y][k] == 0)
        {
            Position tem;
            tem.x = x;
            tem.y = y;
            tem.k = k;
            que.push(tem);
            inqueue[tem.x][tem.y][tem.k] = 1;
        }
    }
}

int driveCar()
{
    Position pos;
    pos.x = pos.y = 1;
    pos.k = k;
    inqueue[1][1][k] = 1;
    que.push(pos);

    while(!que.empty())
    {
        Position p = que.front();
        que.pop();
        inqueue[p.x][p.y][p.k] = 0;
        for(int d = 0; d != 4; d++)
        {
            int dx = dirs[d][0], dy = dirs[d][1];
            int x = p.x + dx, y = p.y + dy;

            if(isValid(x, y))
            {
                int cost = cm[p.x][p.y][p.k];
                if(dx < 0)
                {
                    cost += b;
                }
                if(dy < 0)
                {
                    cost += b;
                }

                // No station.
                if(p.k > 0 && map[p.x][p.y] == 0)
                {
                    // If is better to go to (x, y) from (p.x, p.y)
                    checkBetter(x, y, p.k - 1, cost);
                }
                // Has station, ether a new built one, or one already exists.
                cost += a;
                if(map[p.x][p.y] == 0)
                {
                    cost += c;
                }
                // Add fuel and check again
                checkBetter(x, y, k - 1, cost);
            }
        }
    }

    int mincost = 0x7fffffff;
    for(int i = 0; i <= k; i++)
    {
        if(cm[n][n][i] > 0 && mincost > cm[n][n][i])
        {
            mincost = cm[n][n][i];
        }
    }
    return mincost;
}

int main()
{
#ifdef ACM_LOCAL
    freopen("input.txt", "r", stdin);
    //freopen("output.txt", "w", stdout);
#endif // ACM_LOCAL

    while(scanf("%d%d%d%d%d", &n, &k, &a, &b, &c) != EOF)
    {
        init();

        for(int i = 1; i <= n; i++)
            for(int j = 1; j <= n; j++)
            {
                scanf("%d", &map[i][j]);
            }

        printf("%d\n", driveCar());
    }

#ifdef ACM_LOCAL
    printf("Used time: %lf\n", clock() / (double) CLOCKS_PER_SEC);
#endif // ACM_LOCAL
    return 0;
}
```


速度还是挺快的：

![Result](/assets/img/njupt-1362.png)

不过Candesoft-BLOG里说的分层图最短路的没有仔细看。
