pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Docker Build & Tag') {
            steps {
                // This builds the Docker image using the Dockerfile above
                sh 'docker build -t library-site:latest .'
            }
        }
        stage('Deploy Container') {
            steps {
                // Stops any old version and runs the new library site
                sh 'docker stop library-container || true'
                sh 'docker rm library-container || true'
                sh 'docker run -d -p 8081:80 --name library-container library-site:latest'
            }
        }
    }
}
