console.log("First");
setTimeout(() => {
        console.log("Hello Number 1")
        setTimeout(() => {
                console.log("Hello Number 2")
                setTimeout(() => {
                        console.log("Hello Number 3")
                }, 500)
        }, 1000)
}, 2000)
console.log("Last");
