# Use Ruby image
FROM ruby:3.0

# Install necessary packages
RUN apt-get update && apt-get install -y build-essential

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Update RubyGems to a compatible version
RUN gem update --system

# Install Bundler and gems
RUN gem install bundler -v 2.4.22 && bundle install

# Copy the rest of the application code
COPY . .

# Build the Jekyll site with verbose output
RUN bundle exec jekyll build --verbose

# Expose port and run Jekyll server
EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]