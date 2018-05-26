FROM openjdk:8-jre

WORKDIR /

RUN apt-get update && apt-get install --yes curl jq

RUN LINK="https://github.com/semuxproject/semux/releases/download/v1.2.0/semux-linux-1.2.0-cba85a7.tar.gz" && \
    TARBALL="semux-linux-1.2.0-cba85a7.tar.gz" && \
    curl -Lo ${TARBALL} ${LINK} && \
    mkdir -p /semux && \
    tar -xzf ${TARBALL} -C /semux --strip-components=1 && \
    rm ${TARBALL}

RUN apt-get remove --yes curl jq

WORKDIR /semux

# import devnet key
RUN ./semux-cli.sh --password="" --importprivatekey 0x302e020100300506032b657004220420acbd5f2cb2b6053f704376d12df99f2aa163d267a755c7f1d9fe55d2a2dc5405
ENTRYPOINT ["./semux-cli.sh"]