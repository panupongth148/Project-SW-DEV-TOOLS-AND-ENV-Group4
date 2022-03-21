pipeline {
    agent any

    stages {
        stage('Pull code') {
            steps {
                git branch: 'main', url: 'https://github.com/panupongth148/test_githubCICD'
            }
        }
        stage('Download dependency') {
            steps {
                sh 'cd backend && npm install'
            }
        }
        stage('Run unit test') {
            steps {
                sh 'cd backend && npm test'
            }
        }
        stage('Run component test') {
            steps {
                sh 'cd backend && npm-com'
            }
        }
        stage('Deployment') {
            steps {
                dir("backend"){
                    sh 'git add .'
                    sh 'git commit -m "prepare to deploy'
                    sh 'git push heroku master'
                    sh 'heroku open'
                }
            }
        }
    }
}