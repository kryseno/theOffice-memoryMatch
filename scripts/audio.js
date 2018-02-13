function Audio (path) {
    this.path = path;
    this.renderedElement = null;

    this.renderAudio = function(){
        var audio = $("<audio>");
        var audioSource = $("<source>", {
            src: this.path,
            type: "audio/mpeg"
        })
        audioSource.append(audio);
        this.renderedElement = audio;
        return audio;
    }
}