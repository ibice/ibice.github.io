---
title: "Proxying the OpenShift console"
date: 2024-02-07T18:39:00+01:00
draft: false
summary: "How to address the OpenShift console with a different name"
showTaxonomies: true
tags: [software, containers]
---

{{< alert >}}
This post is under construction.
{{< /alert >}}

## The story

### What's the problem?

### Solutions

## Code

Some Go code here:

```go
func (p *Proxy) reverseProxy(target *url.URL) *httputil.ReverseProxy {
  return &httputil.ReverseProxy{
    ErrorLog: slog.NewLogLogger(slog.With("target", target.String()).Handler(), slog.LevelError),

    Rewrite: func(pr *httputil.ProxyRequest) {
      pr.SetURL(target)
      pr.Out.Host = target.Hostname()

      origin := formatURL(target)
      pr.Out.Header.Set("Origin", origin)
      pr.Out.Header.Set("Referer", origin+"/")
    },

    ModifyResponse: p.modifyResponse,
  }
}
```