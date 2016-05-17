---
Title: USACO 2.3.5 Controlling Companies
Tags: [ACM, USACO]
Date: 2013-02-05 16:36
Gittime: off
---
恩，暴力解决。

参考了http://haipeng31.blog.163.com/blog/static/105623344201011984618863/

主要是changed变量的使用。

```c++
/*
ID: xjtuacm1
PROG: concom
LANG: C++
*/
#include<iostream>
#include<stack>
#include<cstring>
#include<cstdio>
#include<queue>
#include<algorithm>
using namespace std;

const int CMAX = 100 + 1;

int comp[CMAX][CMAX];
bool owns[CMAX][CMAX];

int main(int argc, char *argv[])
{
    freopen("concom.in", "r", stdin);
#ifndef USACO
    freopen("concom.out", "w", stdout);
#endif // USACO

    memset(comp, 0, sizeof(comp));
    memset(owns, false, sizeof(owns));

    int n;
    scanf("%d", &n);
    while(n--)
    {
        int i, j;
        scanf("%d %d", &i, &j);
        scanf("%d", &comp[i][j]);
    }

    for(int i = 0; i!= CMAX; i++)
        owns[i][i] = true; // First condition

    for(int i = 0; i!= CMAX; i++)
        for(int j = 0; j!= true; j++)
            owns[i][j] = (comp[i][j] >= 50); // Second condition. This can be merged with third condition.

    bool changed = true;
    while(changed)
    {
        changed = false;
        for(int i = 1; i!= CMAX; i++)
        {
            for(int j = 1; j!= CMAX; j++)
            {
                if(!owns[i][j])
                {
                    int sum = 0;
                    for(int k = 1; k!= CMAX; k++)
                    {
                        if(owns[i][k])
                            sum += comp[k][j];
                    }

                    if(sum >= 50)
                    {
                        owns[i][j] = true;
                        changed = true;
                    }
                }
            }
        }
    }

    for(int i = 1; i!= CMAX; i++)
    {
        for(int j = 1; j!= CMAX; j++)
        {
            if(owns[i][j] && i!= j)
                printf("%d %d\n", i, j);
        }
    }

    return 0;
}
```

BTW，发现现在碰到暴力的题都有点儿不敢做了。。= =
