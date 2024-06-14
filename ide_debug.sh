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

trap "exit" INT TERM ERR
trap "kill 0" EXIT

export VITE_APP_BASENAME=/

WS_PORT=18080
kubectl --context ${CONTEXT} -n ${NAMESPACE} port-forward $(kubectl --context ${CONTEXT} -n ${NAMESPACE} get pod -l app=sdmc-wss-mqtt -o name) ${WS_PORT}:8080 &
export VITE_WS_SERVER=ws://localhost:${WS_PORT}

MIDDLE_END_PORT=18081
kubectl --context ${CONTEXT} -n ${NAMESPACE} port-forward $(kubectl --context ${CONTEXT} -n ${NAMESPACE} get pod -l app=historian-middleend -o name) ${MIDDLE_END_PORT}:8000 &
export VITE_HISTORIAN_MIDDLE_END_API=http://localhost:${MIDDLE_END_PORT}

MEDIA_SERVICE_PORT=18082
kubectl --context ${CONTEXT} -n ${NAMESPACE} port-forward $(kubectl --context ${CONTEXT} -n ${NAMESPACE} get pod -l app=sdmc-media-service -o name) ${MEDIA_SERVICE_PORT}:8000 &
export VITE_MEDIA_MP4_API=http://localhost:${MEDIA_SERVICE_PORT}/api/mp4
export VITE_MEDIA_JPEG_API=http://localhost:${MEDIA_SERVICE_PORT}/api/jpeg
export VITE_MEDIA_JSON_API=http://localhost:${MEDIA_SERVICE_PORT}/api/json

sleep 6000