#!/bin/sh
set -e

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -n|--namespace)
    NAMESPACE="$2"
    shift # past argument
    shift # past value
    ;;
    -c|--context)
    CONTEXT=$2
    shift # past argument
    shift # past value
    ;;
    -h|--help|*)
    echo "$0 -c(--context) <context> -n(--namespace) <namespace>"
    echo "\nRun with \"teknoir-retail\" as backend:"
    echo "$0 --context gke_teknoir_us-central1-c_teknoir-cluster --namespace teknoir-retail"
    echo ""
    echo ""
    exit 0
    ;;
esac
done

MEDIA_API_BASE_URL=$(kubectl get  --context ${CONTEXT} -n ${NAMESPACE}  pod -l app=sdmc-media-service -o jsonpath="{.items[*].spec.containers[?(@.name=='sdmc-media-service')].env[?(@.name=='BASE_URL')].value}{'\n'}")
if [ -z "$MEDIA_API_BASE_URL" ]; then
  MEDIA_API_BASE_URL="/api"
fi

trap "exit" INT TERM ERR
trap "kill 0" EXIT

export VITE_NAMESPACE=${NAMESPACE}
export VITE_APP_BASENAME=/

WS_PORT=$(jot -r 1  8000 65000)
kubectl --context ${CONTEXT} -n ${NAMESPACE} port-forward $(kubectl --context ${CONTEXT} -n ${NAMESPACE} get pod -l app=sdmc-wss-mqtt -o name) ${WS_PORT}:8080 &
export VITE_WS_SERVER=ws://localhost:${WS_PORT}


MIDDLE_END_PORT=$(jot -r 1  8000 65000)
kubectl --context ${CONTEXT} -n ${NAMESPACE} port-forward $(kubectl --context ${CONTEXT} -n ${NAMESPACE} get pod -l app=historian-middleend -o name) ${MIDDLE_END_PORT}:8000 &
export VITE_HISTORIAN_MIDDLE_END_API=localhost:${MIDDLE_END_PORT}

MEDIA_SERVICE_PORT=$(jot -r 1  8000 65000)
kubectl --context ${CONTEXT} -n ${NAMESPACE} port-forward $(kubectl --context ${CONTEXT} -n ${NAMESPACE} get pod -l app=sdmc-media-service -o name) ${MEDIA_SERVICE_PORT}:8000 &
export VITE_MEDIA_MP4_API=localhost:${MEDIA_SERVICE_PORT}/${MEDIA_API_BASE_URL#/}/mp4
export VITE_MEDIA_JPEG_API=localhost:${MEDIA_SERVICE_PORT}/${MEDIA_API_BASE_URL#/}/jpeg
export VITE_MEDIA_JSON_API=localhost:${MEDIA_SERVICE_PORT}/${MEDIA_API_BASE_URL#/}/json

npm run dev
