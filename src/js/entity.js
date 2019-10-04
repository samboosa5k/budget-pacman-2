class Entity {
    constructor(x, y, type){
        this.x = x,
        this.y = y,
        this.type = type
    }

    render(){
        this.element = document.createElement('div');
        this.element.className = `entity--${this.type}`;
        this.element.innerHTML = (
            `<img src="/img/${this.type}.png">`
        );

        this.element.style.position ='absolute';
        this.element.style.left = `${TILE_SIZE*this.x}px`;
        this.element.style.top = `${TILE_SIZE*this.y}px`;
    }
    mount(parent){
        this.render();
        parent.appendChild(this.element);
    }
    unmount(parent){
        parent.removeChild(this.element)

    }
}