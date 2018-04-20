FROM openjdk:8-jre

WORKDIR /

RUN apt-get update && apt-get install --yes curl jq

RUN LATEST=`curl -s https://api.github.com/repos/semuxproject/semux/releases/latest | jq '.assets[]  | select(.name | contains("linux"))'` && \
    LINK=`echo ${LATEST} | jq -r '.browser_download_url'` && \
    TARBALL=`echo ${LATEST} | jq -r '.name'` && \
    curl -Lo ${TARBALL} ${LINK} && \
    mkdir -p /semux && \
    tar -xzf ${TARBALL} -C /semux --strip-components=1 && \
    rm ${TARBALL}

RUN apt-get remove --yes curl jq

EXPOSE 516

WORKDIR /semux

# import devnet key
RUN ./semux-cli.sh --password="" --importprivatekey 0x302e020100300506032b657004220420acbd5f2cb2b6053f704376d12df99f2aa163d267a755c7f1d9fe55d2a2dc5405
ENTRYPOINT ["./semux-cli.sh"]