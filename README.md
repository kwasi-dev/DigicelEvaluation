This project is my (Kwasi Edwards) implementation of the  project used for the evaluation of a potential employee at Digicel Trinidad and Tobago.

The aim of this application is to create a web application which allows an agent to subscribe a customer to one or
more services offered by Digicel Trinidad and Tobago

# Installation (Ubuntu 18.04)
    
1)  Update the packages and install required packages  on the system using the following commands  
    `sudo apt update `  
    `sudo apt upgrade`   
    `sudo apt install -y wget ca-certificates git python3-pip  python3-waitress`  

2)  Install PostgreSQL version 11 by issuing the following commands  
    
    `echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/postgres.list'`
    
    `wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`  
    
    `sudo apt update `  
    
    `sudo apt install -y postgresql-11 postgresql-server-dev-11`
    
3) Create a new database user and database by issuing the commands
  
    `sudo su - postgres`
    
    `psql`
    
    `CREATE USER digicel WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION;` (replace digicel with desired username)
    
    `\password digicel` (replace digicel with your username and enter a strong password)
    
    `CREATE DATABASE digi;`
    
    `GRANT ALL PRIVILEGES ON DATABASE digi to digicel;`
    
    `\q`
    
    `exit`
    
4) Remember the credentials from the step above as they're necessary to run the backend

5)  Clone the github repository using the command:  
    `git clone https://github.com/logan20/DigicelEvaluation.git`
    `cd DigicelEvaluation` 
    
6)  Modify the app.py file and put your credentials in it
    `sudo nano app.py`
    
7) Install all the required packages using pip
    `sudo -HE pip3 install -r requirements.txt`
    
8) Run the application with the command  
    ` nohup waitress-serve --call 'app:run' &`
    
9) Checkout the frontend branch and follow the readme of the frontend
    `git worktree add ../DigicelEvaluationFrontend frontend`
    `cd ../DigicelEvaluationFrontend/`
    
##Readme continues on the frontend branch