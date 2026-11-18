FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Ark Noah's Greece — coming soon"
LABEL org.opencontainers.image.description="Static coming-soon page for arknoah.gr"
LABEL org.opencontainers.image.source="https://github.com/johnyraid33/arknoah-greece-soon"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public/ /usr/share/nginx/html/

RUN chmod -R a+rX /usr/share/nginx/html /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

STOPSIGNAL SIGQUIT
