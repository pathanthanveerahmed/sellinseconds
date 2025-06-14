name: 🛠️ Update BuyGallery

on:
  push:
    paths:
      - 'dynamic/data.json'
      - 'dynamic/images/**'
      - 'dynamic/generate-html.js'
      - 'dynamic/generate-wacust.js'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repo
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Run HTML Generators
      run: |
        node dynamic/generate-html.js
        node dynamic/generate-wacust.js

    - name: Commit and Push changes
      run: |
        git config user.name "Auto Bot"
        git config user.email "actions@github.com"
        git add dynamic/buygallery.html dynamic/wacust/*.html
        git commit -m "🔁 Auto-generated buygallery and wacust pages"
        git push