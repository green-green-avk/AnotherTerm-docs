{% for p in site.data.toc %}
{% if p.level %}{% for s in (0..p.level) %}{{ '  ' }}{% endfor %}{% endif %}* [[{{ p.title }}]({{ p.url | relative_url }})]
{% endfor %}
