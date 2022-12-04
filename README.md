# CleanArch

Este projeto é para aplicar alguns conceitos de Clean Arch e aprender um pouco sobre o Docker.

docker-compose build --no-cache
docker-compose up -d

Setup do glcoud
gcloud auth login
gcloud config set project PROJECT_ID

Subindo a API no Cloud Run
gcloud run deploy --source . --port 80
Adicionar os papeis "Cloud SQL Client" e "Cloud SQL Admin" ao usuario do serviço
gcloud run services update SERVICE_NAME --add-cloudsql-instances=INSTANCE_CONNECTION_NAME

Subindo a imagem do portal no GCR
gcloud builds submit --tag gcr.io/portal-estetica/portal .

Publicando a imagem do portal no Cloud Run
gcloud run deploy --image gcr.io/portal-estetica/portal --port 80

