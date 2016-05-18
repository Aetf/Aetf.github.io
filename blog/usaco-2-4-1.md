---
Title: USACO 2.4.1 The Tamworth Two
Tags: [ACM, USACO]
Date: 2013-02-05 20:29
Gittime: off
---
牛和农夫按照固定的走法在10x10的地图中走，每分钟走一步，求经过几分钟相遇。永远不能相遇输出0。

纯模拟的题。

判断永远不能相遇的方法是如果遇到了一个先前的状态，那么肯定存在循环，必定不能相遇。

程序中把状态表示为牛和农夫的位置以及面向的方向，通过map判断是否遇到重复状态，因为map中不存在的键会有默认值，对于bool来说就是false。

一点点空间的优化是地图只用存一份，牛和农夫不显示在地图上，尽通过状态里的点间接表示。

```cpp
/*
ID: xjtuacm1
PROG: ttwo
LANG: C++
*/
#include<iostream>
#include<stack>
#include<cstring>
#include<cstdio>
#include<queue>
#include<algorithm>
#include<map>
using namespace std;

const int N = 10;
enum direction {NORTH, EAST, SOUTH, WEST};

struct point
{
    int x, y;
    point(int xx= 0, int yy = 0) :x(xx), y(yy) {}
    void set(int xx, int yy)
    {
        x = xx;
        y = yy;
    }
    bool operator==(const point& pt) const
    {
        return x == pt.x && y == pt.y;
    }
};

struct state
{
    int d[2];
    point pt[2];
    state() { d[0] = d[1] = NORTH; }

    bool operator<(const state& s) const
    {
        return memcmp(this, &s, sizeof(state)) < 0;
    }
};

map<state, bool> h;
char pane[N][N];

inline bool inRange(point pt)
{
    return pt.x >= 0
            && pt.x < 10
            && pt.y >= 0
            && pt.y < 10;
}

bool met(const state& s)
{
    return s.pt[0] == s.pt[1];
}

void next(state& s)
{
    point npt[2];

    for(int i = 0; i!= 2; i++)
    {
        switch(s.d[i])
        {
        case NORTH:
            npt[i].set(s.pt[i].x - 1, s.pt[i].y);
            break;
        case EAST:
            npt[i].set(s.pt[i].x, s.pt[i].y + 1);
            break;
        case SOUTH:
            npt[i].set(s.pt[i].x + 1, s.pt[i].y);
            break;
        case WEST:
            npt[i].set(s.pt[i].x, s.pt[i].y - 1);
            break;
        }

        if(inRange(npt[i])
            && pane[npt[i].x][npt[i].y] != '*')
        {
            s.pt[i] = npt[i];
        }
        else
        {
            s.d[i] += 1;
            s.d[i] %= 4;
        }
    }
}

int main(int argc, char *argv[])
{
    freopen("ttwo.in", "r", stdin);
#ifndef USACO
    freopen("ttwo.out", "w", stdout);
#endif // USACO

    state s;

    for(int i = 0; i!= N; i++)
        for(int j = 0; j!= N; j++)
    {
        scanf("%c", &pane[i][j]);
        if(pane[i][j] == '\n')
            scanf("%c", &pane[i][j]);

        if(pane[i][j] == 'F'
            || pane[i][j] == 'C')
            {
                int t = (pane[i][j] - 'C' == 0 ? 0 : 1);
                s.pt[t].set(i, j);
                pane[i][j] = '.';
            }
    }

    int minute = 0;
    h[s] = true;
    while(!met(s))
    {
        next(s);
        if(h[s])
        {
            printf("0\n");
            return 0;
        }

        h[s] = true;
        minute++;
    }

    printf("%d\n", minute);

    return 0;
}
```

BTW，纯模拟真心考验细心程度= =。。。。
