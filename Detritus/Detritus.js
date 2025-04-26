var modeSelected = null
var tileSelected = null

var score = 0

var max = 6
var row = 4
var col = 4

var board = [
    "4356",
    "2511",
    "4361",
    "2145"
]

window.onload = function() {
    setGame();
}


function setGame() {
    // Modes "cross" and "plus"
    let cross = document.createElement("div");
    cross.id = "cross";
    cross.innerText = "×";
    cross.addEventListener("click", selectMode);
    cross.classList.add("mode");
    document.getElementById("chunk").appendChild(cross);
    let plus = document.createElement("div");
    plus.id = "plus";
    plus.innerText = "+";
    plus.addEventListener("click", selectMode);
    plus.classList.add("mode");
    document.getElementById("chunk").appendChild(plus);

    // Draw board
    for (let r = 0; r < 2*row-1; r++){
        for (let c = 0; c < 2*col-1; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (r%2 == 0 && c%2 == 0) {
                if (board[r/2][c/2] != "-") {
                    tile.innerText = board[r/2][c/2];
                    tile.classList.add("tile-start");
                }
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    // Initialize score
    for (let r = 0; r < 2*row-1; r++) {
        for (let c = 0; c < 2*col-1; c++) {
            score += parseInt(document.getElementById(r.toString() + "-" + c.toString()).innerText) || 0;
        }
    }
    document.getElementById("score").innerText = score;        
}

function selectMode() {
    if (modeSelected != null) {
        modeSelected.classList.remove("mode-selected");
    }
    modeSelected = this;
    modeSelected.classList.add("mode-selected");
}

function selectTile() {
    if (modeSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (r%2 == c%2) {

            // "Cross" mode calculation
            if (modeSelected.id == "cross") {
                let nwr = 0;
                let nwc = 0;
                let nw = 0;
                let ner = 0;
                let nec = 0;
                let ne = 0;
                let swr = 0;
                let swc = 0;
                let sw = 0;
                let ser = 0;
                let sec = 0;
                let se = 0;

                // Get northwest digit
                for (let nwd = 0; nwd < Math.min(r+1,c+1); nwd++) {
                    nwr = r - nwd;
                    nwc = c - nwd;
                    if (document.getElementById(nwr.toString() + "-" + nwc.toString()).innerText != "") {
                        nw = parseInt(document.getElementById(nwr.toString() + "-" + nwc.toString()).innerText);
                        break;
                    }
                }
                if (nw == 0) {
                    return;
                }

                // Get southeast digit
                for (let sed = 0; sed < Math.min(2*row-1-r,2*col-1-c); sed++) {
                    ser = r + sed;
                    sec = c + sed;
                    if (document.getElementById(ser.toString() + "-" + sec.toString()).innerText != "") {
                        se = parseInt(document.getElementById(ser.toString() + "-" + sec.toString()).innerText);
                        break;
                    }
                }
                if (se == 0) {
                    return;
                }


                // Get northeast digit
                for (let ned = 0; ned < Math.min(r+1,2*col-1-c); ned++) {
                    ner = r - ned;
                    nec = c + ned;
                    if (document.getElementById(ner.toString() + "-" + nec.toString()).innerText != "") {
                        ne = parseInt(document.getElementById(ner.toString() + "-" + nec.toString()).innerText);
                        break;
                    }
                }
                if (ne == 0) {
                    return;
                }

                // Get southwest digit
                for (let swd = 0; swd < Math.min(2*row-1-r,c+1); swd++) {
                    swr = r + swd;
                    swc = c - swd;
                    if (document.getElementById(swr.toString() + "-" + swc.toString()).innerText != "") {
                        sw = parseInt(document.getElementById(swr.toString() + "-" + swc.toString()).innerText);
                        break;
                    }
                }
                if (sw == 0) {
                    return;
                }
                
                // Remove digits
                document.getElementById(nwr.toString() + "-" + nwc.toString()).innerText = "";
                document.getElementById(nwr.toString() + "-" + nwc.toString()).classList.remove("tile-start");
                document.getElementById(ser.toString() + "-" + sec.toString()).innerText = "";
                document.getElementById(ser.toString() + "-" + sec.toString()).classList.remove("tile-start");
                document.getElementById(ner.toString() + "-" + nec.toString()).innerText = "";
                document.getElementById(ner.toString() + "-" + nec.toString()).classList.remove("tile-start");
                document.getElementById(swr.toString() + "-" + swc.toString()).innerText = "";
                document.getElementById(swr.toString() + "-" + swc.toString()).classList.remove("tile-start");
                
                // Calculate difference mod max+1
                diff = Math.abs((nw+se)-(ne+sw))%(max+1);
                if (diff != 0) {
                    this.innerText = diff;    
                }
            }

            // "Plus" mode calculation
            if (modeSelected.id == "plus") {
                let nr = 0;
                let nc = 0;
                let n = 0;
                let sr = 0;
                let sc = 0;
                let er = 0;
                let ec = 0;
                let e = 0;
                let wr = 0;
                let wc = 0;
                let w = 0;

                // Get north digit
                for (let nd = 0; nd < r+1; nd++) {
                    nr = r - nd;
                    nc = c;
                    if (document.getElementById(nr.toString() + "-" + nc.toString()).innerText != "") {
                        n = parseInt(document.getElementById(nr.toString() + "-" + nc.toString()).innerText);
                        break;
                    }
                }
                if (n == 0) {
                    return;
                }

                // Get south digit
                for (let sd = 0; sd < 2*row-1-r; sd++) {
                    sr = r + sd;
                    sc = c;
                    if (document.getElementById(sr.toString() + "-" + sc.toString()).innerText != "") {
                        s = parseInt(document.getElementById(sr.toString() + "-" + sc.toString()).innerText);
                        break;
                    }
                }
                if (s == 0) {
                    return;
                }

                // Get east digit
                for (let ed = 0; ed < 2*col-1-c; ed++) {
                    let er = r;
                    let ec = c + ed;
                    if (document.getElementById(er.toString() + "-" + ec.toString()).innerText != "") {
                        e = parseInt(document.getElementById(er.toString() + "-" + ec.toString()).innerText);
                        break;
                    }
                }
                if (e == 0) {
                    return;
                }

                // Get west digit
                for (let wd = 0; wd < c+1; wd++) {
                    let wr = r;
                    let wc = c - wd;
                    if (document.getElementById(wr.toString() + "-" + wc.toString()).innerText != "") {
                        w = parseInt(document.getElementById(wr.toString() + "-" + wc.toString()).innerText);
                        break;
                    }
                }
                if (w == 0) {
                    return;
                }

                // Remove digits
                document.getElementById(nr.toString() + "-" + nc.toString()).innerText = "";
                document.getElementById(nr.toString() + "-" + nc.toString()).classList.remove("tile-start");
                document.getElementById(sr.toString() + "-" + sc.toString()).innerText = "";
                document.getElementById(sr.toString() + "-" + sc.toString()).classList.remove("tile-start");
                document.getElementById(er.toString() + "-" + ec.toString()).innerText = "";
                document.getElementById(er.toString() + "-" + ec.toString()).classList.remove("tile-start");
                document.getElementById(wr.toString() + "-" + wc.toString()).innerText = "";
                document.getElementById(wr.toString() + "-" + wc.toString()).classList.remove("tile-start");

                // Calculate difference mod N+1
                diff = Math.abs((n+s)-(e+w))%(max+1);
                if (diff != 0) {
                    this.innerText = diff;    
                }
            }
        }

        // Recalculate score
        score = 0;
        for (let r = 0; r < 2*row-1; r++) {
            for (let c = 0; c < 2*col-1; c++) {
                score += parseInt(document.getElementById(r.toString() + "-" + c.toString()).innerText) || 0;
            }
        }
        document.getElementById("score").innerText = score;
    }
}