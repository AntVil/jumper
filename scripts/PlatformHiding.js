class PlatformHiding extends Platform {
    render(ctxt) {
        let alpha = Math.max(Math.min(Math.sin(Date.now() / 1000) + 0.5, 1), 0)
        ctxt.fillStyle = `rgba(0, 0, 0, ${alpha})`
        ctxt.fillRect(this.x, this.y, this.width, this.height);
    }
}
