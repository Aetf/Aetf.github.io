---
Title: USACO 3.1.4 Shaping Regions
Tags: [ACM, USACO, Rect-Cutting]
Date: 2013-02-16 22:19
Gittime: off
---

比较基础的矩形切割，是POJ 2528 Mayor's posters的二维版。

还是要注意边缘的情况，比如当(0,8)(18,18) 切割(18,0)(19,19)的时候，结果应该是得到三个矩形

- (18,19)(18,19) --> 面积为1
- (19,0)(19,19) --> 面积为20
- (18,0)(18,7) --> 面积为8

恩，其实我一直没搞懂为啥给数据的时候llx和lly是真正的坐标值，而urx和ury却必须减一之后再用...

```c++
/*
ID: xjtuacm1
PROG: rect1
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
const int M = 100000;
const int N = 1000;

struct rect
{
    int llx, lly;
    int urx, ury;
    int color;
    rect(int lx = 0, int ly = 0, int rx = 0, int ry = 0, int c = 0)
    : llx(lx), lly(ly), urx(rx), ury(ry), color(c) {}

    int S()
    {
        return (urx - llx + 1) * (ury - lly + 1);
    }
}rects[M], cur;
int tot;

inline bool cross(const rect& r1, const rect& r2)
{
    return !(
             (r1.llx > r2.urx)
             || (r1.urx < r2.llx)
             || (r1.lly > r2.ury)
             || (r1.ury < r2.lly));

}

inline void add(const rect& t)
{
    rects[tot++] = t;
}

inline void del(int idx)
{
    rects[idx] = rects[--tot];
}

void cut(const rect& t, bool vertical = false)
{
    int k1, k2;
    rect tem = t;
    if(vertical)
    {
        k1 = max(t.lly, cur.lly);
        k2 = min(t.ury, cur.ury);
        if(t.lly < k1)
        {
            tem.ury = k1 - 1;
            add(tem);
        }
        if(k2 < t.ury)
        {
            tem = t, tem.lly = k2 + 1;
            add(tem);
        }
    }
    else
    {
        k1 = max(t.llx, cur.llx);
        k2 = min(t.urx, cur.urx);
        if(t.llx < k1)
        {
            tem.urx = k1 - 1;
            add(tem);
        }
        if(t.urx > k2)
        {
            tem = t, tem.llx = k2 + 1;
            add(tem);
        }
        tem = t, tem.llx = k1 , tem.urx = k2;
        cut(tem, true);
    }
}


int main(int argc, char *argv[])
{
#ifdef ACM_LOCAL // Local
    freopen("in", "r", stdin);
#else
    #ifndef  ONLINE_JUDGE // not HDOJ / POJ
    freopen("rect1.in", "r", stdin);
    freopen("rect1.out", "w", stdout);
    #endif
#endif

    int a, b, n;
    scanf("%d %d %d", &a, &b, &n);
    add(rect(0, 0, a-1, b-1, 1)); // add the white sheet first.

    while(n--)
    {
        scanf("%d %d %d %d %d", &cur.llx, &cur.lly, &cur.urx, &cur.ury, &cur.color);
        cur.urx--, cur.ury--;

        for(int i = tot-1; i>= 0; i--)
        {
            if(cross(cur, rects[i]))
            {
                cut(rects[i]);
                del(i);
            }
        }
        add(cur);
    }

    map<int, int> cnt;
    for(int i = 0; i!= tot; i++)
    {
        cnt[rects[i].color] += rects[i].S();
    }

    for(map<int, int>::iterator it = cnt.begin(); it!= cnt.end(); it++)
    {
        if(it->second)
            printf("%d %d\n", it->first, it->second);
    }

    return 0;
}
```

BTW, 果然学新的算法就要跟着代码一行一行调试～虽然感觉上慢了点但是可以掌握透彻～

还有，IOI国家集训队论文2004年薛茅的讲线段树跟矩形切割的，很清楚，[链接在这里]({filename}/assets/dl/薛茅-解决动态统计问题的两把利刃——剖析线段树与矩形切割.pdf)。