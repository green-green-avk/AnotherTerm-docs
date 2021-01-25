{% for p in site.data.toc %}{% if p.level %}{% for s in (0..p.level) %}{{ '  ' }}{% endfor %}{% endif %}* [{% if p.url %}[{{ p.title }}]({{ p.url | relative_url | append: '#main_content' }}){% else %}{{ p.title }}{% endif %}]
{% endfor %}
