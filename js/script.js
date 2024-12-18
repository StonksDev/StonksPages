    for (let i = 0; i < 69; i++) {
        const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'cyan', 'lime'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        console.log(`%cSTONKS`, `color: ${randomColor}; font-weight: bold; font-size: 16px;`);
    }