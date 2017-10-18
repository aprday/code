function load(url, callback) {
    function load() {
        script = null;
        callback();
    }

    var script = document.createElement('script');
    script.src = url;
    script.async = true;
    if ( script.readyState ) {
        script.onreadystatechange = onload;
    }
    else {
        script.onload = onload;
    }

    var parent = document.body;
    parent.appendChild(script) && ( parent = null );
}