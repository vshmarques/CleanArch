# CleanArch

Este projeto é para aplicar alguns conceitos de Clean Arch e aprender um pouco sobre o Docker.


docker-compose build --no-cache
docker-compose up -d

Subindo a imagem no GCR
gcloud builds submit --tag gcr.io/portal-estetica/portal

Publicando a imagem no Cloud Run
gcloud run deploy --image gcr.io/portal-estetica/portal --port 80
