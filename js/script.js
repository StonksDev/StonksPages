    for (let i = 0; i < 42; i++) {
        const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'cyan', 'lime'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        console.log(`%cstonks`, `color: ${randomColor}; font-weight: bold; font-size: 16px;`);
    }