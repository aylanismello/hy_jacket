# Create image from nodejs base image
FROM node:6

# Clone the repo from github
RUN git clone https://github.com/aylanismello/hy_jacket_server

# Change working directory to the cloned repo
WORKDIR /hy_jacket_server

# Install all the dependencies
RUN npm install

# Expose port
EXPOSE 80

# Run the application
CMD ["npm", "start"]
