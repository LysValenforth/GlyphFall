// ============================================================================
// GLYPFALL v3.0 — Full Enhanced Edition
// ============================================================================

const BOARD_WIDTH    = 10;
const BOARD_HEIGHT   = 20;
const VISIBLE_HEIGHT = 20;
const BUFFER_HEIGHT  = 20;
const CELL_SIZE      = 30;

const TETROMINOES = {
    I: { color:'#7eb8d4', shapes:[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]], wallKicks:{'0->1':[[0,0],[-2,0],[1,0],[-2,-1],[1,2]],'1->0':[[0,0],[2,0],[-1,0],[2,1],[-1,-2]],'1->2':[[0,0],[-1,0],[2,0],[-1,2],[2,-1]],'2->1':[[0,0],[1,0],[-2,0],[1,-2],[-2,1]],'2->3':[[0,0],[2,0],[-1,0],[2,1],[-1,-2]],'3->2':[[0,0],[-2,0],[1,0],[-2,-1],[1,2]],'3->0':[[0,0],[1,0],[-2,0],[1,-2],[-2,1]],'0->3':[[0,0],[-1,0],[2,0],[-1,2],[2,-1]]}},
    O: { color:'#c9a65b', shapes:[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]], wallKicks:{}},
    T: { color:'#cc1a1a', shapes:[[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]], wallKicks:{'0->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'1->0':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'1->2':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'2->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'2->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]],'3->2':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'3->0':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'0->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]]}},
    S: { color:'#6b9e78', shapes:[[[0,1,1],[1,1,0],[0,0,0]],[[0,1,0],[0,1,1],[0,0,1]],[[0,0,0],[0,1,1],[1,1,0]],[[1,0,0],[1,1,0],[0,1,0]]], wallKicks:{'0->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'1->0':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'1->2':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'2->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'2->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]],'3->2':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'3->0':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'0->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]]}},
    Z: { color:'#c45c2a', shapes:[[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],[[0,0,0],[1,1,0],[0,1,1]],[[0,1,0],[1,1,0],[1,0,0]]], wallKicks:{'0->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'1->0':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'1->2':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'2->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'2->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]],'3->2':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'3->0':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'0->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]]}},
    J: { color:'#3a5f8a', shapes:[[[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]]], wallKicks:{'0->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'1->0':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'1->2':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'2->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'2->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]],'3->2':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'3->0':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'0->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]]}},
    L: { color:'#d4b896', shapes:[[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]]], wallKicks:{'0->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'1->0':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'1->2':[[0,0],[1,0],[1,-1],[0,2],[1,2]],'2->1':[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],'2->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]],'3->2':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'3->0':[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],'0->3':[[0,0],[1,0],[1,1],[0,-2],[1,-2]]}},
    G: { color:'#445566', shapes:[], wallKicks:{} }
};

const SCORE_VALUES = { SINGLE:1,DOUBLE:3,TRIPLE:5,TETRIS:8,T_SPIN_MINI:1,T_SPIN_MINI_SINGLE:2,T_SPIN:4,T_SPIN_SINGLE:8,T_SPIN_DOUBLE:12,T_SPIN_TRIPLE:16,SOFT_DROP:1,HARD_DROP:2,COMBO_BASE:50 };

// ─── PersonalBestManager ─────────────────────────────────────────────────────
class PersonalBestManager {
    constructor() { this.data = {}; this.load(); }
    load() { try { this.data = JSON.parse(localStorage.getItem('glypfall_pb') || '{}'); } catch(e) {} }
    save() { try { localStorage.setItem('glypfall_pb', JSON.stringify(this.data)); } catch(e) {} }
    get(mode) { return this.data[mode] || null; }
    check(mode, state) {
        const pb = this.data[mode];
        const isBetter = mode === 'sprint' ? (!pb || state.elapsedTime < pb.time) : (!pb || state.score > pb.score);
        if (isBetter) {
            this.data[mode] = { time: state.elapsedTime, score: state.score, lines: state.lines, pps: state.pps, date: new Date().toISOString() };
            this.save();
        }
        return isBetter;
    }
}

// ─── StreakManager ────────────────────────────────────────────────────────────
class StreakManager {
    constructor() { this.data = { current:0, best:0, lastDate:null }; this.load(); }
    load() { try { const d = JSON.parse(localStorage.getItem('glypfall_streak') || 'null'); if (d) this.data = {...this.data,...d}; } catch(e) {} }
    save() { try { localStorage.setItem('glypfall_streak', JSON.stringify(this.data)); } catch(e) {} }
    recordPlay() {
        const today = new Date().toDateString();
        if (this.data.lastDate === today) return;
        const yest = new Date(Date.now()-86400000).toDateString();
        this.data.current = (this.data.lastDate === yest) ? this.data.current + 1 : 1;
        if (this.data.current > this.data.best) this.data.best = this.data.current;
        this.data.lastDate = today;
        this.save();
    }
}

// ─── GameState ────────────────────────────────────────────────────────────────
class GameState {
    constructor() { this.reset(); }

    reset() {
        this.board = Array(BOARD_HEIGHT+BUFFER_HEIGHT).fill(null).map(()=>Array(BOARD_WIDTH).fill(0));
        this.score=0; this.lines=0; this.level=1; this.combo=-1; this.b2b=-1;
        this.pieces=0; this.gameOver=false; this.paused=false;
        this.startTime=null; this.elapsedTime=0; this.actions=0; this.pps=0; this.apm=0;
        this.mode='marathon'; this.targetLines=40; this.targetTime=120000;
        this.currentPiece=null; this.currentX=0; this.currentY=0; this.currentRotation=0; this.ghostY=0;
        this.holdPiece=null; this.canHold=true;
        this.bag=[]; this.nextQueue=[]; this.fillQueue();
        this.lockDelay=500; this.lockTimer=0; this.lockResets=0; this.maxLockResets=15;
        this.isOnGround=false; this.dropTimer=0; this.dropInterval=1000; this.softDropping=false;
        this.lastMoveWasRotation=false; this.lastSuccessfulKick=null;
        this.particles=[];
        this.lineClearAnimation={ active:false, lines:[], progress:0, duration:200 };
        this.surgeLevel=0; this.baseInterval=1000;
        this.blindActive=false; this.blindTimer=0; this.blindDuration=2200;
        this.lastActionText=''; this.lastActionColor='#00e5ff';
        this.spawnAnimProgress=1; this.spawnAnimDuration=110;
        this.gameOverAnim={ active:false, progress:0, duration:850 };
        this.justLanded=false; this.bigClear=false; this.pbBeaten=false;
        this._prevOnGround=false;
    }

    fillQueue() { while(this.nextQueue.length<7){ if(!this.bag.length) this.bag=this.shuffle(['I','O','T','S','Z','J','L']); this.nextQueue.push(this.bag.pop()); } }
    shuffle(arr) { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
    getNextPiece() { this.fillQueue(); const t=this.nextQueue.shift(); this.pieces++; this.canHold=true; return t; }

    spawnPiece(pieceType) {
        this.currentPiece=pieceType; this.currentRotation=0;
        this.currentX=3; this.currentY=BUFFER_HEIGHT;
        this.lockTimer=0; this.lockResets=0; this.isOnGround=false;
        this.lastMoveWasRotation=false; this.spawnAnimProgress=0;
        this.updateGhostPosition();
        if(this.checkCollision(this.currentX,this.currentY,this.currentRotation)){this.gameOver=true;return false;}
        return true;
    }

    getCurrentShape() { return TETROMINOES[this.currentPiece].shapes[this.currentRotation]; }

    checkCollision(x,y,rotation) {
        const shape=TETROMINOES[this.currentPiece].shapes[rotation];
        for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){
            const bx=x+c, by=y+r;
            if(bx<0||bx>=BOARD_WIDTH) return true;
            if(by>=BOARD_HEIGHT+BUFFER_HEIGHT) return true;
            if(by>=0&&this.board[by][bx]) return true;
        }
        return false;
    }

    movePiece(dx,dy) {
        if(!this.checkCollision(this.currentX+dx,this.currentY+dy,this.currentRotation)){
            this.currentX+=dx; this.currentY+=dy;
            if(dx!==0){ this.lastMoveWasRotation=false; this.actions++; if(this.isOnGround&&this.lockResets<this.maxLockResets){this.lockTimer=0;this.lockResets++;} }
            this.updateGhostPosition(); return true;
        }
        return false;
    }

    rotatePiece(dir) {
        const newRot=((this.currentRotation+dir)+4)%4;
        const kicks=TETROMINOES[this.currentPiece].wallKicks;
        const key=`${this.currentRotation}->${newRot}`;
        const tests=kicks[key]||[[0,0]];
        for(const [kx,ky] of tests){
            if(!this.checkCollision(this.currentX+kx,this.currentY-ky,newRot)){
                this.currentX+=kx; this.currentY-=ky; this.currentRotation=newRot;
                this.lastMoveWasRotation=true; this.lastSuccessfulKick=[kx,ky]; this.actions++;
                if(this.isOnGround&&this.lockResets<this.maxLockResets){this.lockTimer=0;this.lockResets++;}
                this.updateGhostPosition(); return true;
            }
        }
        return false;
    }

    rotatePiece180() {
        const target=(this.currentRotation+2)%4;
        const offsets=[[0,0],[0,-1],[1,0],[-1,0],[1,-1],[-1,-1],[0,-2],[1,-2],[-1,-2]];
        for(const [kx,ky] of offsets){
            if(!this.checkCollision(this.currentX+kx,this.currentY+ky,target)){
                this.currentX+=kx; this.currentY+=ky; this.currentRotation=target;
                this.lastMoveWasRotation=true; this.lastSuccessfulKick=[kx,ky]; this.actions++;
                if(this.isOnGround&&this.lockResets<this.maxLockResets){this.lockTimer=0;this.lockResets++;}
                this.updateGhostPosition(); return true;
            }
        }
        return false;
    }

    updateGhostPosition() { let gy=this.currentY; while(!this.checkCollision(this.currentX,gy+1,this.currentRotation))gy++; this.ghostY=gy; }

    hardDrop() { const dist=this.ghostY-this.currentY; this.currentY=this.ghostY; this.score+=dist*SCORE_VALUES.HARD_DROP; this.actions++; this.lockPiece(); }

    detectTSpin() {
        if(this.currentPiece!=='T'||!this.lastMoveWasRotation) return {isTSpin:false,isMini:false};
        const x=this.currentX,y=this.currentY;
        const corners=[[x,y],[x+2,y],[x,y+2],[x+2,y+2]];
        let filled=0;
        for(const [cx,cy] of corners) if(cx<0||cx>=BOARD_WIDTH||cy<0||cy>=BOARD_HEIGHT+BUFFER_HEIGHT||this.board[cy][cx]) filled++;
        if(filled<3) return {isTSpin:false,isMini:false};
        const fronts={0:[[x,y],[x+2,y]],1:[[x+2,y],[x+2,y+2]],2:[[x,y+2],[x+2,y+2]],3:[[x,y],[x,y+2]]};
        const front=fronts[this.currentRotation]||[];
        let ff=0;
        for(const [cx,cy] of front) if(cx<0||cx>=BOARD_WIDTH||cy<0||cy>=BOARD_HEIGHT+BUFFER_HEIGHT||this.board[cy][cx]) ff++;
        return {isTSpin:true,isMini:ff<2};
    }

    lockPiece() {
        if(!this.currentPiece) return;
        const tSpinInfo=this.detectTSpin();
        const shape=this.getCurrentShape();
        for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){
            const by=this.currentY+r,bx=this.currentX+c;
            if(by>=0) this.board[by][bx]=this.currentPiece;
        }
        if(this.mode==='blindfall'){this.blindActive=true;this.blindTimer=0;}
        // Capture colors BEFORE clearLines splices rows (FIX for particle color bug)
        const pendingLines=[];
        for(let r=0;r<BOARD_HEIGHT+BUFFER_HEIGHT;r++) if(this.board[r].every(c=>c!==0)) pendingLines.push(r);
        const capturedColors=pendingLines.map(row=>this.board[row].map(cell=>(cell&&TETROMINOES[cell])?TETROMINOES[cell].color:'#ffffff'));
        const linesCleared=this.clearLines(pendingLines,capturedColors);
        this.updateScore(linesCleared,tSpinInfo);
        this.bigClear=(linesCleared===4)||(tSpinInfo.isTSpin&&linesCleared>0)||(this.combo>=3);
        const txt=this.getActionText(linesCleared,tSpinInfo);
        if(txt){ this.lastActionText=txt; this.lastActionColor=linesCleared===4?'#ffe100':tSpinInfo.isTSpin?'#c800ff':this.b2b>0?'#ff8c00':'#00e5ff'; }
        const next=this.getNextPiece();
        if(!this.spawnPiece(next)) this.gameOver=true;
    }

    getActionText(linesCleared,tSpinInfo) {
        if(linesCleared===0&&!tSpinInfo.isTSpin) return '';
        let text='';
        if(tSpinInfo.isTSpin){ text=tSpinInfo.isMini?'T-SPIN MINI':'T-SPIN'; if(linesCleared===1)text+=' SINGLE'; else if(linesCleared===2)text+=' DOUBLE'; else if(linesCleared===3)text+=' TRIPLE'; }
        else { const names=['','SINGLE','DOUBLE','TRIPLE','GLYPFALL!']; text=names[linesCleared]||`${linesCleared} LINES`; }
        if(this.b2b>0) text='B2B '+text;
        if(this.combo>0) text+=`  ×${this.combo+1} COMBO`;
        return text;
    }

    clearLines(pendingLines, capturedColors) {
        if(!pendingLines){ pendingLines=[]; for(let r=0;r<BOARD_HEIGHT+BUFFER_HEIGHT;r++) if(this.board[r].every(c=>c!==0)) pendingLines.push(r); capturedColors=pendingLines.map(row=>this.board[row].map(cell=>(cell&&TETROMINOES[cell])?TETROMINOES[cell].color:'#ffffff')); }
        if(pendingLines.length>0){
            this._createParticlesFromCapture(pendingLines,capturedColors);
            this.lineClearAnimation.active=true; this.lineClearAnimation.lines=[...pendingLines]; this.lineClearAnimation.progress=0;
            for(const row of pendingLines){this.board.splice(row,1);this.board.unshift(Array(BOARD_WIDTH).fill(0));}
            this.lines+=pendingLines.length;
            const prevLevel=this.level; this.level=Math.floor(this.lines/10)+1;
            if(this.level!==prevLevel) this.updateDropSpeed();
            if(this.mode==='flux') this.applyFlux(pendingLines.length);
        }
        return pendingLines.length;
    }

    _createParticlesFromCapture(rows,capturedColors) {
        if(!game||!game.settings.get('particleEffects')) return;
        if(game.settings.get('reducedMotion')) return;
        for(let ri=0;ri<rows.length;ri++){
            for(let col=0;col<BOARD_WIDTH;col++){
                const color=capturedColors[ri][col];
                for(let i=0;i<5;i++) this.particles.push({x:col*CELL_SIZE+CELL_SIZE/2,y:(rows[ri]-BUFFER_HEIGHT)*CELL_SIZE+CELL_SIZE/2,vx:(Math.random()-0.5)*14,vy:(Math.random()-0.5)*14-4,life:1,color,size:Math.random()*3+1.5});
            }
        }
    }

    applyFlux(count) {
        for(let i=0;i<count;i++){
            // Target tallest column
            let tallestCol=0,tallestH=0;
            for(let c=0;c<BOARD_WIDTH;c++) for(let r=0;r<BOARD_HEIGHT+BUFFER_HEIGHT;r++) if(this.board[r][c]){const h=BOARD_HEIGHT+BUFFER_HEIGHT-r;if(h>tallestH){tallestH=h;tallestCol=c;}break;}
            const col=tallestH>3?tallestCol:Math.floor(Math.random()*BOARD_WIDTH);
            for(let r=0;r<BOARD_HEIGHT+BUFFER_HEIGHT-1;r++) this.board[r][col]=this.board[r+1][col];
            this.board[BOARD_HEIGHT+BUFFER_HEIGHT-1][col]=Math.random()<0.6?'G':0;
        }
    }

    updateScore(linesCleared,tSpinInfo) {
        if(linesCleared===0&&!tSpinInfo.isTSpin){this.combo=-1;return;}
        this.combo++;
        let points=0,isB2B=false;
        if(tSpinInfo.isTSpin){ isB2B=true; if(tSpinInfo.isMini) points=linesCleared===0?SCORE_VALUES.T_SPIN_MINI*100:SCORE_VALUES.T_SPIN_MINI_SINGLE*100; else points=([0,SCORE_VALUES.T_SPIN_SINGLE,SCORE_VALUES.T_SPIN_DOUBLE,SCORE_VALUES.T_SPIN_TRIPLE][linesCleared]||SCORE_VALUES.T_SPIN)*100; }
        else { const bm=[0,SCORE_VALUES.SINGLE,SCORE_VALUES.DOUBLE,SCORE_VALUES.TRIPLE,SCORE_VALUES.TETRIS]; points=(bm[linesCleared]||0)*100; if(linesCleared===4) isB2B=true; }
        if(isB2B&&this.b2b>=0) points=Math.floor(points*1.5);
        if(isB2B) this.b2b++; else this.b2b=-1;
        points+=this.combo*SCORE_VALUES.COMBO_BASE;
        points*=this.level;
        this.score+=points;
    }

    updateDropSpeed() { this.dropInterval=Math.max(80,1000-(this.level-1)*60); this.baseInterval=this.dropInterval; }

    updateParticles(dt) {
        this.particles=this.particles.filter(p=>{p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.vx*=0.94;p.vy+=0.5;p.life-=dt/500;return p.life>0;});
    }

    update(dt) {
        if(this.paused) return;
        // Game over animation keeps running after gameOver flag set
        if(this.gameOverAnim.active){
            this.gameOverAnim.progress=Math.min(this.gameOverAnim.duration,this.gameOverAnim.progress+dt);
        }
        if(this.gameOver) return;
        if(!this.startTime) this.startTime=performance.now();
        this.elapsedTime+=dt;
        const secs=this.elapsedTime/1000;
        if(secs>0){this.pps=this.pieces/secs;this.apm=(this.actions/secs)*60;}
        this.updateParticles(dt);
        if(this.spawnAnimProgress<1) this.spawnAnimProgress=Math.min(1,this.spawnAnimProgress+dt/this.spawnAnimDuration);
        if(this.lineClearAnimation.active){this.lineClearAnimation.progress+=dt;if(this.lineClearAnimation.progress>=this.lineClearAnimation.duration) this.lineClearAnimation.active=false;}
        if(this.mode==='ultra'&&this.elapsedTime>=this.targetTime){this.gameOver=true;return;}
        if(this.mode==='sprint'&&this.lines>=this.targetLines){this.gameOver=true;return;}
        if(this.mode==='surge'){const newSL=Math.floor(this.elapsedTime/25000);if(newSL>this.surgeLevel){this.surgeLevel=newSL;this.dropInterval=Math.max(80,this.baseInterval-this.surgeLevel*100);}}
        if(this.mode==='blindfall'&&this.blindActive){this.blindTimer+=dt;if(this.blindTimer>=this.blindDuration){this.blindActive=false;this.blindTimer=0;}}
        if(this.mode==='zen'){
            this.isOnGround=this.checkCollision(this.currentX,this.currentY+1,this.currentRotation);
            if(this.isOnGround){this.lockTimer+=dt;if(this.lockTimer>=this.lockDelay*3)this.lockPiece();}else{this.lockTimer=0;this.lockResets=0;}
            return;
        }
        const prevOnGround=this.isOnGround;
        this.isOnGround=this.checkCollision(this.currentX,this.currentY+1,this.currentRotation);
        this.justLanded=(!prevOnGround&&this.isOnGround);
        if(this.isOnGround){this.lockTimer+=dt;if(this.lockTimer>=this.lockDelay)this.lockPiece();}
        else{this.lockTimer=0;this.lockResets=0;}
        const effInterval=this.softDropping?this.dropInterval/(game?game.settings.get('softDropFactor'):20):this.dropInterval;
        this.dropTimer+=dt;
        if(this.dropTimer>=effInterval){if(this.movePiece(0,1)&&this.softDropping)this.score+=SCORE_VALUES.SOFT_DROP;this.dropTimer=0;}
    }

    holdCurrentPiece() {
        if(!this.canHold) return false;
        const temp=this.holdPiece; this.holdPiece=this.currentPiece;
        if(temp) this.spawnPiece(temp); else this.spawnPiece(this.getNextPiece());
        this.canHold=false; this.actions++; return true;
    }
}

// ─── InputHandler ─────────────────────────────────────────────────────────────
class InputHandler {
    constructor() {
        this.keys={};
        this.bindings={moveLeft:'ArrowLeft',moveRight:'ArrowRight',softDrop:'ArrowDown',hardDrop:' ',rotateCW:'ArrowUp',rotateCCW:'z',rotateCCW2:'Z',rotate180:'a',rotate180_2:'A',hold:'c',hold2:'C',pause:'Escape'};
        this.das=133; this.arr=10; this.dasTimer=0; this.arrTimer=0; this.dasDir=null;
        this.setupListeners();
    }
    setupListeners() { window.addEventListener('keydown',e=>this.onKeyDown(e)); window.addEventListener('keyup',e=>this.onKeyUp(e)); }
    onKeyDown(e) {
        if([' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
        if(this.keys[e.key]) return; this.keys[e.key]=true;
        if(!game||!game.state||game.state.gameOver) return;
        const s=game.state,b=this.bindings;
        if(e.key===b.pause){game.togglePause();return;}
        if(s.paused) return;
        if(e.key===b.hardDrop){s.hardDrop();game.audio.play('drop');return;}
        if(e.key===b.hold||e.key===b.hold2){
            if(s.holdCurrentPiece()) game.audio.play('hold');
            else game.audio.play('holdLocked');
            return;
        }
        if(e.key===b.rotateCW){if(s.rotatePiece(1))game.audio.play('rotate');return;}
        if(e.key===b.rotateCCW||e.key===b.rotateCCW2){if(s.rotatePiece(-1))game.audio.play('rotate');return;}
        if(e.key===b.rotate180||e.key===b.rotate180_2){if(s.rotatePiece180())game.audio.play('rotate180');return;}
        if(e.key===b.moveLeft){this.dasDir=-1;this.dasTimer=0;this.arrTimer=0;if(s.movePiece(-1,0))game.audio.play('move');return;}
        if(e.key===b.moveRight){this.dasDir=1;this.dasTimer=0;this.arrTimer=0;if(s.movePiece(1,0))game.audio.play('move');return;}
        if(e.key===b.softDrop){s.softDropping=true;return;}
    }
    onKeyUp(e) {
        this.keys[e.key]=false;
        if(e.key===this.bindings.moveLeft&&this.dasDir===-1){this.dasDir=null;this.dasTimer=0;}
        if(e.key===this.bindings.moveRight&&this.dasDir===1){this.dasDir=null;this.dasTimer=0;}
        if(e.key===this.bindings.softDrop&&game&&game.state) game.state.softDropping=false;
    }
    update(dt) {
        if(!game||!game.state||game.state.paused||game.state.gameOver) return;
        if(this.dasDir!==null){
            this.dasTimer+=dt;
            if(this.dasTimer>=this.das){this.arrTimer+=dt;if(this.arrTimer>=this.arr){if(game.state.movePiece(this.dasDir,0))game.audio.play('move');this.arrTimer=0;}}
        }
        const fill=document.getElementById('dasFill');
        if(fill){
            if(this.dasDir!==null&&this.dasTimer<this.das){fill.style.width=(this.dasTimer/this.das*100)+'%';fill.classList.remove('charged');}
            else if(this.dasDir!==null){fill.style.width='100%';fill.classList.add('charged');}
            else{fill.style.width='0%';fill.classList.remove('charged');}
        }
    }
}

// ─── Renderer ─────────────────────────────────────────────────────────────────
class Renderer {
    constructor() {
        this.canvas=document.getElementById('gameCanvas'); this.ctx=this.canvas.getContext('2d');
        this.holdCanvas=document.getElementById('holdCanvas'); this.holdCtx=this.holdCanvas.getContext('2d');
        this.nextCanvases=Array.from(document.querySelectorAll('.next-canvas'));
        this.nextContexts=this.nextCanvases.map(c=>c.getContext('2d'));
    }
    render(state) { this.renderBoard(state); this.renderHold(state); this.renderNext(state); this.renderParticles(state); }

    renderBoard(state) {
        const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height,theme=game.settings.get('theme');
        ctx.fillStyle='#000000'; ctx.fillRect(0,0,w,h);
        // Stronger grid lines
        ctx.strokeStyle='rgba(255,255,255,0.05)'; ctx.lineWidth=1;
        for(let r=0;r<=VISIBLE_HEIGHT;r++){ctx.beginPath();ctx.moveTo(0,r*CELL_SIZE);ctx.lineTo(w,r*CELL_SIZE);ctx.stroke();}
        for(let c=0;c<=BOARD_WIDTH;c++){ctx.beginPath();ctx.moveTo(c*CELL_SIZE,0);ctx.lineTo(c*CELL_SIZE,h);ctx.stroke();}

        if(state.blindActive){
            const alpha=Math.min(0.95,(state.blindTimer/state.blindDuration)*1.5);
            ctx.fillStyle=`rgba(0,0,0,${alpha})`;ctx.fillRect(0,0,w,h);
        } else {
            const vis=state.board.slice(BUFFER_HEIGHT);
            for(let r=0;r<VISIBLE_HEIGHT;r++) for(let c=0;c<BOARD_WIDTH;c++){
                const cell=vis[r][c];
                if(cell&&TETROMINOES[cell]){
                    let cellAlpha=1;
                    if(state.gameOverAnim.active){const prog=state.gameOverAnim.progress/state.gameOverAnim.duration;const threshold=1-(r/VISIBLE_HEIGHT);if(prog>threshold)cellAlpha=Math.max(0.05,1-(prog-threshold)*8);}
                    this.drawCell(ctx,c,r,TETROMINOES[cell].color,cellAlpha,false,theme);
                }
            }
        }

        // Line clear — shockwave wipe expanding from center
        if(state.lineClearAnimation.active&&!game.settings.get('reducedMotion')){
            const p=state.lineClearAnimation.progress/state.lineClearAnimation.duration;
            for(const row of state.lineClearAnimation.lines){
                const vy=(row-BUFFER_HEIGHT)*CELL_SIZE;
                if(vy<0) continue;
                const hw=w*0.5*p; // half-width of wipe
                const cx=w/2;
                const grad=ctx.createLinearGradient(cx-hw,0,cx+hw,0);
                grad.addColorStop(0,'transparent');
                grad.addColorStop(0.3,`rgba(255,255,255,${(1-p)*0.9})`);
                grad.addColorStop(0.5,`rgba(255,255,255,${(1-p)*1.0})`);
                grad.addColorStop(0.7,`rgba(255,255,255,${(1-p)*0.9})`);
                grad.addColorStop(1,'transparent');
                ctx.fillStyle=grad;
                ctx.fillRect(0,vy,w,CELL_SIZE);
            }
        }

        // Ghost
        if(game.settings.get('ghostPiece')&&state.currentPiece){
            const shape=state.getCurrentShape();
            const op=(game.settings.get('ghostOpacity')||30)/100;
            const gAlpha=game.settings.get('reducedMotion')?op:op+Math.sin(performance.now()*0.004)*0.04*op;
            for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){
                const x=state.currentX+c,y=state.ghostY+r-BUFFER_HEIGHT;
                if(y>=0&&y<VISIBLE_HEIGHT) this.drawCell(ctx,x,y,TETROMINOES[state.currentPiece].color,gAlpha,true,theme);
            }
        }

        // Active piece with spawn pop + subtle brightness pulse
        if(state.currentPiece&&!state.lineClearAnimation.active){
            const shape=state.getCurrentShape();
            const color=TETROMINOES[state.currentPiece].color;
            const spawnScale=game.settings.get('reducedMotion')?1:1+(1-state.spawnAnimProgress)*0.2;
            // Gentle 1-2% brightness pulse on active piece only
            const pulse=game.settings.get('reducedMotion')?1:1+Math.sin(performance.now()*0.0018)*0.015;
            ctx.save();
            if(spawnScale!==1){
                let minC=4,maxC=0,minR=4,maxR=0;
                for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){minC=Math.min(minC,c);maxC=Math.max(maxC,c);minR=Math.min(minR,r);maxR=Math.max(maxR,r);}
                const cx=((state.currentX+minC+state.currentX+maxC+1)/2)*CELL_SIZE;
                const cy=((state.currentY+minR-BUFFER_HEIGHT+state.currentY+maxR+1-BUFFER_HEIGHT)/2)*CELL_SIZE;
                ctx.translate(cx,cy);ctx.scale(spawnScale,spawnScale);ctx.translate(-cx,-cy);
            }
            ctx.globalAlpha=pulse;
            for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){
                const x=state.currentX+c,y=state.currentY+r-BUFFER_HEIGHT;
                if(y>=0&&y<VISIBLE_HEIGHT) this.drawCell(ctx,x,y,color,1,false,theme);
            }
            ctx.restore();
        }

        // Lock delay color bar
        if(state.currentPiece&&state.isOnGround&&state.lockTimer>0&&!state.gameOverAnim.active){
            const lp=state.lockTimer/state.lockDelay;
            const rv=Math.floor(255*lp),gv=Math.floor(255*(1-lp));
            ctx.strokeStyle=`rgba(${rv},${gv},0,${0.4+lp*0.5})`;
            ctx.lineWidth=2;
            const shape=state.getCurrentShape();
            for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){
                const x=state.currentX+c,y=state.currentY+r-BUFFER_HEIGHT;
                if(y>=0) ctx.strokeRect(x*CELL_SIZE+1,y*CELL_SIZE+1,CELL_SIZE-2,CELL_SIZE-2);
            }
        }

        if(state.mode==='surge'&&state.surgeLevel>0){ctx.fillStyle=`rgba(255,28,78,${Math.min(0.15,state.surgeLevel*0.04)})`;ctx.fillRect(0,0,w,h);}

        // Ambient vignette — subtle depth, darkens corners
        if(!game.settings.get('reducedMotion')){
            const vig=ctx.createRadialGradient(w/2,h/2,h*0.28,w/2,h/2,h*0.82);
            vig.addColorStop(0,'rgba(0,0,0,0)');
            vig.addColorStop(1,'rgba(0,0,0,0.38)');
            ctx.fillStyle=vig; ctx.fillRect(0,0,w,h);
        }
    }

    drawCell(ctx,x,y,color,alpha=1,isGhost=false,theme='solid') {
        const pad=1,size=CELL_SIZE-pad*2,px=x*CELL_SIZE+pad,py=y*CELL_SIZE+pad;
        ctx.save(); ctx.globalAlpha=alpha;
        if(isGhost){ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.strokeRect(px+2,py+2,size-4,size-4);ctx.restore();return;}
        switch(theme){
            case 'glyph': ctx.strokeStyle=color;ctx.lineWidth=2;ctx.strokeRect(px+1,py+1,size-2,size-2);ctx.globalAlpha=alpha*0.35;ctx.strokeStyle=color;ctx.lineWidth=1;ctx.strokeRect(px+5,py+5,size-10,size-10);break;
            case 'tsushima': {
                // Step 1: solid dark base at full opacity
                ctx.globalAlpha = 1;
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(px, py, size, size);
                // Step 2: subtle color wash inside
                ctx.globalAlpha = alpha * 0.18;
                ctx.fillStyle = color;
                ctx.fillRect(px + 2, py + 2, size - 4, size - 4);
                // Step 3: crisp outer border with glow
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 6;
                ctx.shadowColor = color;
                ctx.strokeRect(px + 0.75, py + 0.75, size - 1.5, size - 1.5);
                ctx.shadowBlur = 0;
                // Step 4: bright top-edge shimmer line
                ctx.globalAlpha = alpha * 0.55;
                ctx.fillStyle = color;
                ctx.fillRect(px + 2, py + 2, size - 4, 1.5);
                break;
            }
            case 'neon': ctx.shadowBlur=18;ctx.shadowColor=color;ctx.fillStyle=color;ctx.fillRect(px,py,size,size);ctx.shadowBlur=4;ctx.fillStyle=this.lighten(color,40);ctx.fillRect(px+3,py+3,size-6,3);break;
            case 'minimal': ctx.fillStyle=color+'55';ctx.fillRect(px,py,size,size);ctx.strokeStyle=color+'aa';ctx.lineWidth=1;ctx.strokeRect(px,py,size,size);break;
            case 'crystal':{const g=ctx.createLinearGradient(px,py,px+size,py+size);g.addColorStop(0,color+'cc');g.addColorStop(0.5,color+'88');g.addColorStop(1,color+'33');ctx.fillStyle=g;ctx.fillRect(px,py,size,size);ctx.fillStyle='rgba(255,255,255,0.22)';ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+size*0.6,py);ctx.lineTo(px,py+size*0.6);ctx.closePath();ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=1;ctx.strokeRect(px,py,size,size);break;}
            case 'pixel':{const lt=this.lighten(color,10),dk=this.darken(color,20),tile=4;for(let dy=0;dy<size;dy+=tile)for(let dx=0;dx<size;dx+=tile){ctx.fillStyle=((dx/tile+dy/tile)%2===0)?lt:dk;ctx.fillRect(px+dx,py+dy,Math.min(tile,size-dx),Math.min(tile,size-dy));}ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=1;ctx.strokeRect(px,py,size,size);break;}
            default:{const g=ctx.createLinearGradient(px,py,px+size,py+size);g.addColorStop(0,this.lighten(color,18));g.addColorStop(0.6,color);g.addColorStop(1,this.darken(color,18));ctx.fillStyle=g;ctx.fillRect(px,py,size,size);ctx.fillStyle='rgba(255,255,255,0.14)';ctx.fillRect(px,py,size,Math.floor(size*0.28));}
        }
        ctx.restore();
    }

    lighten(hex,pct){const n=parseInt(hex.replace('#',''),16),a=Math.round(2.55*pct);return '#'+((1<<24)+(Math.min(255,(n>>16)+a)<<16)+(Math.min(255,((n>>8)&0xff)+a)<<8)+Math.min(255,(n&0xff)+a)).toString(16).slice(1);}
    darken(hex,pct){const n=parseInt(hex.replace('#',''),16),a=Math.round(2.55*pct);return '#'+((1<<24)+(Math.max(0,(n>>16)-a)<<16)+(Math.max(0,((n>>8)&0xff)-a)<<8)+Math.max(0,(n&0xff)-a)).toString(16).slice(1);}

    // Compute true bounding box of filled cells in a shape matrix
    _bbox(shape){
        let minR=shape.length,maxR=0,minC=shape[0]?shape[0].length:0,maxC=0,found=false;
        for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){
            if(r<minR)minR=r; if(r>maxR)maxR=r; if(c<minC)minC=c; if(c>maxC)maxC=c; found=true;
        }
        return found?{minR,maxR,minC,maxC}:{minR:0,maxR:0,minC:0,maxC:0};
    }

    renderHold(state) {
        const ctx=this.holdCtx,w=this.holdCanvas.width,h=this.holdCanvas.height,theme=game.settings.get('theme');
        ctx.clearRect(0,0,w,h);ctx.fillStyle='#000000';ctx.fillRect(0,0,w,h);
        if(state.holdPiece){
            const shape=TETROMINOES[state.holdPiece].shapes[0],color=TETROMINOES[state.holdPiece].color,cs=22;
            const {minR,maxR,minC,maxC}=this._bbox(shape);
            const bboxW=(maxC-minC+1)*cs,bboxH=(maxR-minR+1)*cs;
            const ox=(w-bboxW)/2-minC*cs, oy=(h-bboxH)/2-minR*cs;
            const a=state.canHold?1:0.28;
            for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){ctx.save();ctx.translate(ox+c*cs,oy+r*cs);ctx.globalAlpha=a;this.drawMiniCell(ctx,color,cs,theme);ctx.restore();}
        }
    }

    renderNext(state) {
        const qSize=Math.min(game.settings.get('queueSize'),this.nextCanvases.length);
        const theme=game.settings.get('theme');
        for(let i=0;i<this.nextCanvases.length;i++){
            const cv=this.nextCanvases[i],ctx=this.nextContexts[i];
            ctx.clearRect(0,0,cv.width,cv.height);ctx.fillStyle='#000000';ctx.fillRect(0,0,cv.width,cv.height);
            if(i<qSize&&state.nextQueue[i]){
                const pt=state.nextQueue[i],shape=TETROMINOES[pt].shapes[0],color=TETROMINOES[pt].color;
                const cs=i===0?24:18;
                // Use real bounding box for true centering
                const {minR,maxR,minC,maxC}=this._bbox(shape);
                const bboxW=(maxC-minC+1)*cs,bboxH=(maxR-minR+1)*cs;
                const ox=(cv.width-bboxW)/2-minC*cs, oy=(cv.height-bboxH)/2-minR*cs;
                const fade=i===0?1:Math.max(0.35,1-i*0.14);
                for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]){ctx.save();ctx.translate(ox+c*cs,oy+r*cs);ctx.globalAlpha=fade;this.drawMiniCell(ctx,color,cs,theme);ctx.restore();}
            }
        }
    }

    drawMiniCell(ctx,color,cs,theme){
        const p=1,s=cs-p*2;
        switch(theme){
            case 'glyph': ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.strokeRect(p,p,s,s);break;
            case 'tsushima': {
                ctx.globalAlpha = 1;
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(p, p, s, s);
                ctx.globalAlpha = 0.18;
                ctx.fillStyle = color;
                ctx.fillRect(p + 1, p + 1, s - 2, s - 2);
                ctx.globalAlpha = 1;
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 5;
                ctx.shadowColor = color;
                ctx.strokeRect(p + 0.75, p + 0.75, s - 1.5, s - 1.5);
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = color;
                ctx.fillRect(p + 1, p + 1, s - 2, 1.5);
                break;
            }
            case 'neon': ctx.shadowBlur=8;ctx.shadowColor=color;ctx.fillStyle=color;ctx.fillRect(p,p,s,s);break;
            case 'minimal': ctx.fillStyle=color+'55';ctx.fillRect(p,p,s,s);ctx.strokeStyle=color+'aa';ctx.lineWidth=1;ctx.strokeRect(p,p,s,s);break;
            case 'crystal': ctx.fillStyle=color+'aa';ctx.fillRect(p,p,s,s);ctx.fillStyle='rgba(255,255,255,0.2)';ctx.fillRect(p,p,s*0.5,s*0.5);break;
            case 'pixel': ctx.fillStyle=this.lighten(color,10);ctx.fillRect(p,p,s,s);break;
            default: ctx.fillStyle=color;ctx.fillRect(p,p,s,s);ctx.fillStyle='rgba(255,255,255,0.18)';ctx.fillRect(p,p,s,4);
        }
    }

    renderParticles(state) {
        const ctx=this.ctx;
        for(const p of state.particles){ctx.save();ctx.globalAlpha=p.life*0.9;ctx.fillStyle=p.color;ctx.shadowBlur=8;ctx.shadowColor=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);ctx.restore();}
    }
}

// ─── UIManager ────────────────────────────────────────────────────────────────
class UIManager {
    constructor() {
        this.els={score:document.getElementById('score'),lines:document.getElementById('lines'),level:document.getElementById('level'),time:document.getElementById('time'),pps:document.getElementById('pps'),apm:document.getElementById('apm'),combo:document.getElementById('combo'),b2b:document.getElementById('b2b')};
        this.actionEl=document.getElementById('actionDisplay');
        this.actionTimer=null; this._lastAction=''; this._lastScore=-1;
    }
    update(state) {
        // Score flash on big clear
        const scoreEl=this.els.score;
        if(state.score!==this._lastScore){
            this._lastScore=state.score;
            if(state.bigClear){state.bigClear=false;scoreEl.classList.remove('score-flash');void scoreEl.offsetWidth;scoreEl.classList.add('score-flash');}
        }
        scoreEl.textContent=state.score.toLocaleString();
        this.els.lines.textContent=state.lines;
        this.els.level.textContent=state.level;
        this.els.time.textContent=this.fmtTime(state.elapsedTime);
        this.els.pps.textContent=state.pps.toFixed(2);
        this.els.apm.textContent=Math.floor(state.apm);
        this.els.combo.textContent=Math.max(0,state.combo);
        this.els.b2b.textContent=Math.max(0,state.b2b);
        if(state.lastActionText&&state.lastActionText!==this._lastAction){
            this._lastAction=state.lastActionText;
            this.showAction(state.lastActionText,state.lastActionColor);
            state.lastActionText='';
        }
        // Land sound
        if(state.justLanded){ game.audio.play('land'); state.justLanded=false; }
    }
    showAction(text,color='#00e5ff'){
        if(!this.actionEl) return;
        this.actionEl.textContent=text; this.actionEl.style.color=color;
        this.actionEl.classList.add('show');
        clearTimeout(this.actionTimer);
        this.actionTimer=setTimeout(()=>this.actionEl.classList.remove('show'),1600);
    }
    fmtTime(ms){const tot=Math.floor(ms/1000),min=Math.floor(tot/60),sec=tot%60,mils=Math.floor(ms%1000);return `${min}:${String(sec).padStart(2,'0')}.${String(mils).padStart(3,'0')}`;}
}

// ─── AudioManager ─────────────────────────────────────────────────────────────
class AudioManager {
    constructor(){
        this.ctx=null; this.sfxVolume=0.7;
        this._moveLastT=0; // rate-limit move sound to 50ms
        this._music=null; this._musicGain=null; this._musicVol=0;
        this.init();
    }
    init(){try{this.ctx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}
    resume(){if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume();}
    tone(freq,type,duration,vol,startDelay=0){
        if(!this.ctx) return; this.resume();
        try{
            const t=this.ctx.currentTime+startDelay,osc=this.ctx.createOscillator(),g=this.ctx.createGain();
            osc.connect(g);g.connect(this.ctx.destination);
            osc.type=type; osc.frequency.setValueAtTime(freq,t);
            g.gain.setValueAtTime(vol*this.sfxVolume,t);
            g.gain.exponentialRampToValueAtTime(0.001,t+duration);
            osc.start(t); osc.stop(t+duration);
        }catch(e){}
    }
    subBass(freq,duration,vol){
        if(!this.ctx) return; this.resume();
        try{
            const t=this.ctx.currentTime,osc=this.ctx.createOscillator(),g=this.ctx.createGain();
            const bq=this.ctx.createBiquadFilter(); bq.type='lowpass'; bq.frequency.value=180;
            osc.connect(bq); bq.connect(g); g.connect(this.ctx.destination);
            osc.type='sine'; osc.frequency.setValueAtTime(freq,t);
            osc.frequency.exponentialRampToValueAtTime(20,t+duration);
            g.gain.setValueAtTime(vol*this.sfxVolume,t);
            g.gain.exponentialRampToValueAtTime(0.001,t+duration);
            osc.start(t); osc.stop(t+duration);
        }catch(e){}
    }
    play(name){
        if(!this.ctx) return;
        const now=performance.now();
        switch(name){
            // Rate-limited: no buzzing at fast ARR
            case 'move':
                if(now-this._moveLastT<50) return;
                this._moveLastT=now;
                this.tone(200,'square',0.05,0.12); break;
            case 'rotate':    this.tone(320,'triangle',0.07,0.18); break;
            case 'rotate180': this.tone(280,'triangle',0.09,0.22); this.tone(380,'triangle',0.07,0.16,0.04); break;
            case 'drop':      this.tone(100,'sawtooth',0.12,0.28); this.subBass(80,0.18,0.6); break;
            case 'land':      this.tone(160,'triangle',0.06,0.08); break;
            case 'hold':      this.tone(440,'triangle',0.1,0.18); break;
            // Distinct sound when hold is locked out
            case 'holdLocked': this.tone(180,'square',0.08,0.14); this.tone(160,'square',0.06,0.12,0.06); break;
            case 'start':     this.tone(330,'sine',0.1,0.25); this.tone(440,'sine',0.1,0.25,0.1); this.tone(550,'sine',0.15,0.3,0.2); break;
            case 'lineClear': this.tone(440,'sine',0.25,0.35); this.tone(660,'sine',0.15,0.3,0.1); this.subBass(120,0.22,0.5); break;
            case 'tetris':
            case 'glypfall':  [440,550,660,880,1100].forEach((f,i)=>this.tone(f,'sine',0.25,0.35,i*0.08)); this.subBass(60,0.4,0.9); break;
            case 'combo':{ const n=game&&game.state?Math.max(0,game.state.combo):0; this.tone(440+n*40,'sine',0.18,0.3); break; }
            case 'gameOver':  [440,370,310,220].forEach((f,i)=>this.tone(f,'sawtooth',0.35,0.25,i*0.22)); break;
        }
    }
    setSFXVolume(v){ this.sfxVolume=v/100; }

    // ── Generative ambient music ──────────────────────────────────────────────
    startMusic(volumePct){
        if(!this.ctx) return; this.resume();
        this.stopMusic();
        const vol=(volumePct||40)/100*0.18;
        if(vol<0.001) return;
        try{
            const g=this.ctx.createGain(); g.gain.setValueAtTime(0,this.ctx.currentTime);
            g.gain.linearRampToValueAtTime(vol,this.ctx.currentTime+2.5);
            g.connect(this.ctx.destination);
            this._musicGain=g; this._musicVol=vol;
            // Two detuned drone oscillators
            const drones=[[55,0],[55.3,3],[82.4,0],[82.7,5]];
            this._music=drones.map(([freq,detune])=>{
                const osc=this.ctx.createOscillator(),gd=this.ctx.createGain();
                // LFO for gentle tremolo
                const lfo=this.ctx.createOscillator(),lg=this.ctx.createGain();
                lfo.frequency.value=0.08+Math.random()*0.06; lg.gain.value=0.018;
                lfo.connect(lg); lg.connect(gd.gain);
                osc.type='sine'; osc.frequency.value=freq; osc.detune.value=detune;
                gd.gain.setValueAtTime(0.25,this.ctx.currentTime);
                osc.connect(gd); gd.connect(g);
                lfo.start(); osc.start();
                return {osc,lfo,gd};
            });
        }catch(e){}
    }
    pauseMusic(){
        if(this._musicGain&&this.ctx){
            try{ this._musicGain.gain.linearRampToValueAtTime(0,this.ctx.currentTime+0.4); }catch(e){}
        }
    }
    resumeMusic(){
        if(this._musicGain&&this.ctx&&this._musicVol>0){
            try{ this._musicGain.gain.linearRampToValueAtTime(this._musicVol,this.ctx.currentTime+0.4); }catch(e){}
        }
    }
    stopMusic(){
        if(this._music){
            try{
                const t=this.ctx.currentTime;
                if(this._musicGain) this._musicGain.gain.linearRampToValueAtTime(0,t+0.8);
                setTimeout(()=>{
                    this._music&&this._music.forEach(({osc,lfo})=>{try{osc.stop();lfo.stop();}catch(e){}});
                    this._music=null; this._musicGain=null;
                },900);
            }catch(e){ this._music=null; }
        }
    }
}

// ─── SettingsManager ──────────────────────────────────────────────────────────
class SettingsManager {
    constructor(){
        this.defaults={das:133,arr:10,softDropFactor:20,sfxVolume:70,musicVolume:40,ghostPiece:true,particleEffects:true,showCountdown:true,queueSize:5,theme:'tsushima',ghostOpacity:30,accentColor:'#ffffff',reducedMotion:false};
        this.data={...this.defaults};this.load();
    }
    load(){try{const s=localStorage.getItem('glypfallSettings');if(s)this.data={...this.defaults,...JSON.parse(s)};}catch(e){}}
    save(){try{localStorage.setItem('glypfallSettings',JSON.stringify(this.data));}catch(e){}}
    get(k){return this.data[k];}
    set(k,v){this.data[k]=v;this.save();}
}

// ─── StatisticsManager ───────────────────────────────────────────────────────
class StatisticsManager {
    constructor(){
        this.defaults={totalGames:0,totalTime:0,totalLines:0,totalPieces:0,totalScore:0,bestPPS:0,avgPPS:0,bestGame:null};
        this.data={...this.defaults};this.load();
    }
    load(){try{const s=localStorage.getItem('glypfallStats');if(s)this.data={...this.defaults,...JSON.parse(s)};}catch(e){}}
    save(){try{localStorage.setItem('glypfallStats',JSON.stringify(this.data));}catch(e){}}
    record(state){
        this.data.totalGames++;
        this.data.totalTime+=state.elapsedTime;
        this.data.totalLines+=state.lines;
        this.data.totalPieces+=state.pieces;
        this.data.totalScore+=state.score;
        if(state.pps>this.data.bestPPS) this.data.bestPPS=state.pps;
        // Track per-game average PPS properly
        this.data.avgPPS=((this.data.avgPPS*(this.data.totalGames-1))+state.pps)/this.data.totalGames;
        // Best single game
        if(!this.data.bestGame||state.score>this.data.bestGame.score)
            this.data.bestGame={score:state.score,lines:state.lines,pps:parseFloat(state.pps.toFixed(2)),apm:Math.floor(state.apm),time:state.elapsedTime,mode:state.mode,date:new Date().toISOString()};
        this.save();
    }
}

// ─── LeaderboardManager ──────────────────────────────────────────────────────
class LeaderboardManager {
    constructor(){this.boards={};this.load();}
    load(){try{const s=localStorage.getItem('glypfallLeaderboard');if(s)this.boards=JSON.parse(s);}catch(e){}}
    save(){try{localStorage.setItem('glypfallLeaderboard',JSON.stringify(this.boards));}catch(e){}}
    add(mode,entry){
        if(!this.boards[mode]) this.boards[mode]=[];
        this.boards[mode].push(entry);
        this.boards[mode].sort((a,b)=>mode==='sprint'?a.time-b.time:b.score-a.score);
        this.boards[mode]=this.boards[mode].slice(0,10);
        this.save();
    }
    get(mode){return this.boards[mode]||[];}
    clear(mode){this.boards[mode]=[];this.save();}
}

// ─── IdleAnimation ────────────────────────────────────────────────────────────
class IdleAnimation {
    constructor(){
        this.canvas=document.getElementById('idleCanvas');
        this.ctx=this.canvas.getContext('2d');
        this.pieces=[];this.running=false;this.raf=null;
        this.idleTimer=0;this.IDLE_DELAY=28000;
        this._resize();
        window.addEventListener('resize',()=>this._resize());
    }
    _resize(){ if(!this.canvas) return; this.canvas.width=window.innerWidth;this.canvas.height=window.innerHeight; }
    start(){
        this.running=true;this.canvas.classList.add('visible');
        if(!this.raf) this._loop();
    }
    stop(){
        this.running=false; this.canvas.classList.remove('visible');
        if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}
    }
    resetIdle(){ this.idleTimer=0; this.stop(); }
    tickIdle(dt){
        this.idleTimer+=dt;
        if(this.idleTimer>this.IDLE_DELAY&&!this.running) this.start();
    }
    _spawn(){
        const types=['I','O','T','S','Z','J','L'];
        const t=types[Math.floor(Math.random()*types.length)];
        const color=TETROMINOES[t].color;
        return {x:Math.random()*this.canvas.width,y:-40,vx:(Math.random()-0.5)*0.6,vy:Math.random()*0.8+0.4,rot:Math.random()*Math.PI*2,vrot:(Math.random()-0.5)*0.02,alpha:Math.random()*0.12+0.04,type:t,color,size:Math.random()*16+14};
    }
    _loop(){
        if(!this.running){this.raf=null;return;}
        this.raf=requestAnimationFrame(()=>this._loop());
        const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height;
        ctx.clearRect(0,0,w,h);
        if(this.pieces.length<22) this.pieces.push(this._spawn());
        this.pieces=this.pieces.filter(p=>{
            p.x+=p.vx;p.y+=p.vy;p.rot+=p.vrot;
            if(p.y>h+60) return false;
            const shape=TETROMINOES[p.type].shapes[0];
            ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=p.alpha;ctx.strokeStyle=p.color;ctx.lineWidth=1.5;
            for(let r=0;r<shape.length;r++) for(let c=0;c<shape[r].length;c++) if(shape[r][c]) ctx.strokeRect((c-shape[r].length/2)*p.size,(r-shape.length/2)*p.size,p.size-1,p.size-1);
            ctx.restore();
            return true;
        });
    }
}

// ─── TouchHandler ─────────────────────────────────────────────────────────────
// Gesture-only controls — no button overlay:
//   • Hold & drag left/right  → move piece column by column
//   • Swipe up                → rotate CW  (double-tap / swipe up fast → rotate CCW)
//   • Swipe down (fast)       → hard drop
//   • Swipe down (slow)       → soft drop
//   • Tap                     → rotate CW
//   • Double-tap              → rotate CCW
class TouchHandler {
    constructor() {
        // Touch origin
        this.touchStartX    = 0;
        this.touchStartY    = 0;
        this.touchStartTime = 0;
        this.lastTapTime    = 0;

        // Drag state
        this._dragging      = false;   // true once horizontal drag is confirmed
        this._dragLastX     = 0;       // last processed x during drag
        this._dragAccum     = 0;       // sub-cell pixel accumulator

        // Thresholds
        this.swipeThreshold = 28;   // min px for a directional swipe
        this.dragInitThresh = 10;   // px horizontal before drag mode locks in
        this.tapMaxMove     = 14;   // max total movement for a tap
        this.tapMaxTime     = 250;  // max ms for tap
        this.doubleTapGap   = 300;  // ms window for double-tap → rotate CCW
        this.hardDropSpeed  = 0.65; // px/ms — above this = hard drop

        // Board geometry (300 px wide, 10 columns → 30 px/cell)
        this.cellWidth = 30;

        this.setupListeners();
    }

    setupListeners() {
        // Attach to the whole game screen so the full area responds to gestures
        const zone = document.getElementById('gameScreen');
        if (!zone) return;
        zone.addEventListener('touchstart', e => this.onTouchStart(e), { passive: false });
        zone.addEventListener('touchmove',  e => this.onTouchMove(e),  { passive: false });
        zone.addEventListener('touchend',   e => this.onTouchEnd(e),   { passive: false });
        zone.addEventListener('touchcancel',e => this._resetDrag(),    { passive: true  });
    }

    _resetDrag() {
        this._dragging  = false;
        this._dragAccum = 0;
    }

    // ── Touch start ───────────────────────────────────────────────────────────
    onTouchStart(e) {
        e.preventDefault();
        const t = e.touches[0];
        this.touchStartX    = t.clientX;
        this.touchStartY    = t.clientY;
        this.touchStartTime = performance.now();
        this._dragLastX     = t.clientX;
        this._dragAccum     = 0;
        this._dragging      = false;
    }

    // ── Touch move — drives horizontal drag in real-time ─────────────────────
    onTouchMove(e) {
        e.preventDefault();
        if (!game || !game.state || game.state.gameOver || game.state.paused) return;

        const t      = e.touches[0];
        const totalDx = t.clientX - this.touchStartX;
        const totalDy = t.clientY - this.touchStartY;

        // Lock into drag mode once horizontal movement dominates
        if (!this._dragging) {
            const absX = Math.abs(totalDx);
            const absY = Math.abs(totalDy);
            if (absX >= this.dragInitThresh && absX > absY) {
                this._dragging  = true;
                this._dragLastX = t.clientX;
                this._dragAccum = 0;
            } else if (absY > absX + 8) {
                // Vertical intent — don't hijack as drag
                return;
            } else {
                return; // not enough movement yet
            }
        }

        // Accumulate pixel delta and fire moves per cell crossed
        const delta = t.clientX - this._dragLastX;
        this._dragLastX  = t.clientX;
        this._dragAccum += delta;

        const cells = Math.trunc(this._dragAccum / this.cellWidth);
        if (cells !== 0) {
            this._dragAccum -= cells * this.cellWidth;
            const dir = Math.sign(cells);
            for (let i = 0; i < Math.abs(cells); i++) {
                if (game.state.movePiece(dir, 0)) game.audio.play('move');
            }
        }
    }

    // ── Touch end — classify gesture ──────────────────────────────────────────
    onTouchEnd(e) {
        e.preventDefault();
        if (!game || !game.state) return;

        // Any touch resumes pause
        if (game.state.paused) { game.togglePause(); this._resetDrag(); return; }
        if (game.state.gameOver) { this._resetDrag(); return; }

        const t    = e.changedTouches[0];
        const dx   = t.clientX - this.touchStartX;
        const dy   = t.clientY - this.touchStartY;
        const dt   = performance.now() - this.touchStartTime;
        const dist = Math.hypot(dx, dy);
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        // ── Horizontal drag ended — nothing extra needed ───────────────────────
        if (this._dragging) {
            this._resetDrag();
            return;
        }

        // ── Tap → rotate CW  /  double-tap → rotate CCW ───────────────────────
        if (dist < this.tapMaxMove && dt < this.tapMaxTime) {
            const now = performance.now();
            if (now - this.lastTapTime < this.doubleTapGap) {
                if (game.state.rotatePiece(-1)) game.audio.play('rotate');
                this.lastTapTime = 0;
            } else {
                this.lastTapTime = now;
                if (game.state.rotatePiece(1))  game.audio.play('rotate');
            }
            return;
        }

        // ── Swipe up → rotate CW ─────────────────────────────────────────────
        if (absY > absX && dy < -this.swipeThreshold) {
            if (game.state.rotatePiece(1)) game.audio.play('rotate');
            return;
        }

        // ── Swipe down → hard drop (fast) or soft drop (slow) ────────────────
        if (absY > absX && dy > this.swipeThreshold) {
            const speed = absY / dt; // px/ms
            if (speed >= this.hardDropSpeed) {
                game.state.hardDrop();
                game.audio.play('drop');
            } else {
                game.state.softDropping = true;
                setTimeout(() => { if (game && game.state) game.state.softDropping = false; }, 400);
            }
        }
    }
}

// ─── Game (Main Controller) ───────────────────────────────────────────────────
class Game {
    constructor(){
        this.state=new GameState();
        this.input=new InputHandler();
        this.touch=new TouchHandler();
        this.renderer=new Renderer();
        this.ui=new UIManager();
        this.audio=new AudioManager();
        this.settings=new SettingsManager();
        this.stats=new StatisticsManager();
        this.lb=new LeaderboardManager();
        this.pb=new PersonalBestManager();
        this.streak=new StreakManager();
        this.idle=new IdleAnimation();
        this.lastTime=performance.now();
        this.running=false; this.loopId=null;
        this.setupUI();
        this.applySavedSettings();
        this.updateStreakBar();
    }

    setupUI(){
        // Mode buttons with keyboard support
        document.querySelectorAll('[data-mode]').forEach(btn=>{
            if(btn.classList.contains('tab-btn')) return;
            btn.addEventListener('click',()=>this.startGame(btn.dataset.mode));
            btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')this.startGame(btn.dataset.mode);});
        });

        // Nav buttons
        document.getElementById('settingsBtn').addEventListener('click',()=>this.showScreen('settingsScreen'));
        document.getElementById('statisticsBtn').addEventListener('click',()=>{this.populateStats();this.showScreen('statisticsScreen');});
        document.getElementById('leaderboardBtn').addEventListener('click',()=>{this.showLeaderboard();this.showScreen('leaderboardScreen');});

        // Back buttons
        document.getElementById('backToMenu').addEventListener('click',()=>this.showScreen('mainMenu'));
        document.getElementById('backToMenuFromStats').addEventListener('click',()=>this.showScreen('mainMenu'));
        document.getElementById('backToMenuFromLeaderboard').addEventListener('click',()=>this.showScreen('mainMenu'));

        // Overlay buttons
        document.getElementById('resumeBtn').addEventListener('click',()=>this.togglePause());
        document.getElementById('restartBtn').addEventListener('click',()=>this.startGame(this.state.mode));
        document.getElementById('menuBtn').addEventListener('click',()=>this.requestQuit());

        // Confirm dialog
        document.getElementById('confirmYes').addEventListener('click',()=>this.doQuit());
        document.getElementById('confirmNo').addEventListener('click',()=>document.getElementById('confirmOverlay').classList.add('hidden'));

        // Share button
        document.getElementById('shareBtn').addEventListener('click',()=>this.shareResult());

        // Leaderboard clear
        document.getElementById('clearLeaderboard').addEventListener('click',()=>{
            const activeTab=document.querySelector('.tab-btn.active');
            if(activeTab){this.lb.clear(activeTab.dataset.mode);this.updateLeaderboard(activeTab.dataset.mode);}
        });

        // Settings ranges
        this.bindRange('dasValue',   v=>{this.settings.set('das',v);this.input.das=v;},       'dasDisplay',  v=>`${v} ms`);
        this.bindRange('arrValue',   v=>{this.settings.set('arr',v);this.input.arr=v;},        'arrDisplay',  v=>`${v} ms`);
        this.bindRange('sdfValue',   v=>this.settings.set('softDropFactor',v),                 'sdfDisplay',  v=>`×${v}`);
        this.bindRange('sfxVolume',  v=>{this.settings.set('sfxVolume',v);this.audio.setSFXVolume(v);},'sfxDisplay',v=>`${v}%`);
        this.bindRange('musicVolume',v=>this.settings.set('musicVolume',v),                    'musicDisplay',v=>`${v}%`);
        this.bindRange('queueSize',  v=>this.settings.set('queueSize',v),                      'queueDisplay',v=>`${v}`);
        this.bindRange('ghostOpacity',v=>this.settings.set('ghostOpacity',v),                  'ghostOpacityDisplay',v=>`${v}%`);

        // Checkboxes
        this.bindCheck('ghostPiece',     v=>this.settings.set('ghostPiece',v));
        this.bindCheck('particleEffects',v=>this.settings.set('particleEffects',v));
        this.bindCheck('showCountdown',  v=>this.settings.set('showCountdown',v));
        this.bindCheck('reducedMotion',  v=>{this.settings.set('reducedMotion',v);document.body.classList.toggle('reduced-motion',v);});

        // Theme picker
        document.querySelectorAll('.theme-opt').forEach(btn=>{
            btn.addEventListener('click',()=>{
                document.querySelectorAll('.theme-opt').forEach(b=>b.classList.remove('active'));
                btn.classList.add('active'); this.settings.set('theme',btn.dataset.theme);
            });
        });

        // Block colors + Accent + Palettes
        bc_wireInputs(); bc_wirePalettes(); accent_wire();

        // Leaderboard tabs
        document.querySelectorAll('.tab-btn').forEach(btn=>{
            btn.addEventListener('click',()=>{
                document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                this.updateLeaderboard(btn.dataset.mode);
            });
        });

        // Reset idle on any interaction
        ['click','keydown','mousemove'].forEach(ev=>window.addEventListener(ev,()=>this.idle.resetIdle(),{passive:true}));
    }

    bindRange(id,onChange,displayId,fmt){
        const el=document.getElementById(id),dis=document.getElementById(displayId);
        if(!el) return;
        el.addEventListener('input',()=>{const v=parseInt(el.value);onChange(v);if(dis)dis.textContent=fmt(v);});
    }
    bindCheck(id,onChange){const el=document.getElementById(id);if(!el)return;el.addEventListener('change',()=>onChange(el.checked));}

    applySavedSettings(){
        const set=(id,key,fmt,dispId)=>{const el=document.getElementById(id),dis=document.getElementById(dispId),val=this.settings.get(key);if(el)el.value=val;if(dis)dis.textContent=fmt(val);};
        set('dasValue','das',v=>`${v} ms`,'dasDisplay');
        set('arrValue','arr',v=>`${v} ms`,'arrDisplay');
        set('sdfValue','softDropFactor',v=>`x${v}`,'sdfDisplay');
        set('sfxVolume','sfxVolume',v=>`${v}%`,'sfxDisplay');
        set('musicVolume','musicVolume',v=>`${v}%`,'musicDisplay');
        set('queueSize','queueSize',v=>`${v}`,'queueDisplay');
        set('ghostOpacity','ghostOpacity',v=>`${v}%`,'ghostOpacityDisplay');
        const setChk=(id,key)=>{const el=document.getElementById(id);if(el)el.checked=this.settings.get(key);};
        setChk('ghostPiece','ghostPiece');setChk('particleEffects','particleEffects');
        setChk('showCountdown','showCountdown');setChk('reducedMotion','reducedMotion');
        if(this.settings.get('reducedMotion')) document.body.classList.add('reduced-motion');
        const theme=this.settings.get('theme');
        document.querySelectorAll('.theme-opt').forEach(btn=>btn.classList.toggle('active',btn.dataset.theme===theme));
        const savedPal=localStorage.getItem('glypfall_palette')||'default';
        document.querySelectorAll('.palette-opt').forEach(btn=>btn.classList.toggle('active',btn.dataset.palette===savedPal));
        this.input.das=this.settings.get('das');
        this.input.arr=this.settings.get('arr');
        this.audio.setSFXVolume(this.settings.get('sfxVolume'));
        bc_syncUI();
        // Restore recently-played badge
        const lastMode=localStorage.getItem('glypfall_lastmode');
        if(lastMode) document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('recently-played',b.dataset.mode===lastMode));
    }

    showScreen(id){
        document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if(id==='mainMenu') this.idle.resetIdle();
    }

    updateStreakBar(){
        const bar=document.getElementById('streakBar');
        if(!bar) return;
        const s=this.streak.data;
        if(s.current>0){ bar.textContent=`${s.current} day streak`; bar.classList.add('active'); }
        else { bar.textContent=''; bar.classList.remove('active'); }
    }

    startGame(mode){
        this.running=false; if(this.loopId) cancelAnimationFrame(this.loopId);
        this.idle.stop(); this.idle.resetIdle();

        // Mark recently played on buttons
        try{localStorage.setItem('glypfall_lastmode',mode);}catch(e){}
        document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('recently-played',b.dataset.mode===mode));

        this.state.reset(); this.state.mode=mode;
        if(mode==='sprint')  this.state.targetLines=40;
        if(mode==='ultra')   this.state.targetTime=120000;
        if(mode==='zen')     this.state.dropInterval=999999;
        const modeNames={sprint:'SPRINT',marathon:'MARATHON',ultra:'ULTRA',zen:'ZEN',surge:'SURGE',blindfall:'BLINDFALL',flux:'FLUX'};
        const targets={sprint:'40 LINES',marathon:'ENDLESS',ultra:'2 MIN',zen:'RELAX',surge:'SURVIVE',blindfall:'DARK',flux:'CHAOS'};
        const mEl=document.getElementById('modeLabel'),tEl=document.getElementById('targetLabel');
        if(mEl) mEl.textContent=modeNames[mode]||mode.toUpperCase();
        if(tEl) tEl.textContent=targets[mode]||'—';

        const pb=this.pb.get(mode);
        const pbRow=document.getElementById('pbRow'),pbVal=document.getElementById('pbVal');
        if(pb&&pbRow&&pbVal){
            pbRow.style.display='';
            pbVal.textContent=mode==='sprint'?this.ui.fmtTime(pb.time):pb.score.toLocaleString();
        } else if(pbRow) pbRow.style.display='none';

        this.state.spawnPiece(this.state.getNextPiece());
        document.getElementById('gameOverlay').classList.add('hidden');
        document.getElementById('confirmOverlay').classList.add('hidden');
        document.getElementById('shareBtn').style.display='none';

        this.streak.recordPlay();
        this.updateStreakBar();

        // Launch transition: brief flash then show game screen
        const doLaunch=()=>{
            this.showScreen('gameScreen');
            if(this.settings.get('showCountdown')) this.runCountdown(()=>this.beginLoop());
            else { this.audio.play('start'); this.beginLoop(); }
            // Start ambient music
            this.audio.startMusic(this.settings.get('musicVolume'));
        };

        if(!this.settings.get('reducedMotion')){
            document.body.classList.add('launch-flash');
            setTimeout(()=>{document.body.classList.remove('launch-flash');doLaunch();},180);
        } else {
            doLaunch();
        }
    }

    runCountdown(cb){
        let n=3;
        const ov=document.getElementById('countdownOverlay'),num=document.getElementById('countdownNum');
        ov.classList.remove('hidden');
        const tick=()=>{
            if(n>0){ num.textContent=n; num.style.animation='none'; num.offsetHeight; num.style.animation=''; n--; setTimeout(tick,900); }
            else { ov.classList.add('hidden'); this.audio.play('start'); cb(); }
        };
        tick();
    }

    beginLoop(){ this.running=true; this.lastTime=performance.now(); this.loop(); }

    loop(){
        if(!this.running) return;
        const now=performance.now(),dt=Math.min(now-this.lastTime,50);
        this.lastTime=now;
        this.input.update(dt);
        this.state.update(dt);
        this.renderer.render(this.state);
        this.ui.update(this.state);

        if(document.getElementById('mainMenu').classList.contains('active')) this.idle.tickIdle(dt);

        // Combo escalation
        if(this.state.bigClear&&this.state.combo>0) this.audio.play('combo');

        if(this.state.gameOver){
            const ov=document.getElementById('gameOverlay');
            if(ov.classList.contains('hidden')){
                this.onGameOver();
                // Screen shake on game over
                if(!this.settings.get('reducedMotion')){
                    const bw=document.querySelector('.board-wrap');
                    if(bw){bw.classList.add('shake');setTimeout(()=>bw.classList.remove('shake'),400);}
                }
            }
            // keep rendering for game-over board animation
            if(this.state.gameOverAnim.active&&this.state.gameOverAnim.progress<this.state.gameOverAnim.duration){
                this.loopId=requestAnimationFrame(()=>this.loop());
            } else {
                this.running=false;
            }
            return;
        }
        // Danger state
        const boardEl=document.querySelector('.board-wrap');
        if(boardEl){
            let topFilled=BOARD_HEIGHT;
            const vis=this.state.board.slice(BUFFER_HEIGHT);
            for(let r=0;r<VISIBLE_HEIGHT;r++) if(vis[r].some(c=>c!==0)){topFilled=r;break;}
            boardEl.classList.toggle('danger',topFilled<4);
        }
        this.loopId=requestAnimationFrame(()=>this.loop());
    }

    togglePause(){
        if(this.state.gameOver) return;
        this.state.paused=!this.state.paused;
        const ov=document.getElementById('gameOverlay');
        if(this.state.paused){
            this.audio.pauseMusic();
            ov.classList.remove('hidden');
            document.getElementById('ovTitle').textContent='PAUSED';
            document.getElementById('ovTitle').className='ov-title';
            document.getElementById('ovSub').textContent='Press ESC to resume';
            document.getElementById('ovStats').innerHTML='';
            document.getElementById('resumeBtn').style.display='';
            document.getElementById('shareBtn').style.display='none';
        } else {
            ov.classList.add('hidden');
            this.audio.resumeMusic();
            this.lastTime=performance.now();
            if(!this.running){this.running=true;this.loop();}
        }
    }

    requestQuit(){
        if(this.state.gameOver){ this.doQuit(); return; }
        this.state.paused=true;
        document.getElementById('gameOverlay').classList.add('hidden');
        document.getElementById('confirmOverlay').classList.remove('hidden');
    }
    doQuit(){ document.getElementById('confirmOverlay').classList.add('hidden'); this.running=false; this.audio.stopMusic(); this.showScreen('mainMenu'); }

    onGameOver(){
        const s=this.state;
        const isWin=(s.mode==='sprint'&&s.lines>=s.targetLines)||(s.mode==='ultra'&&s.elapsedTime>=s.targetTime);
        const isPB=this.pb.check(s.mode,s);

        const titleEl=document.getElementById('ovTitle');
        titleEl.textContent=isWin?'COMPLETE!':'GAME OVER';
        titleEl.className='ov-title '+(isWin?'is-win':'is-over');
        document.getElementById('ovSub').textContent=isWin?'Objective reached':'Stack topped out';

        const statsEl=document.getElementById('ovStats');
        const rows=[['Score',s.score.toLocaleString()],['Lines',s.lines],['Time',this.ui.fmtTime(s.elapsedTime)],['PPS',s.pps.toFixed(2)],['APM',Math.floor(s.apm)]];
        if(isPB) rows.unshift(['','<span class="icon-trophy"></span> NEW PERSONAL BEST']);
        statsEl.innerHTML=rows.map(([l,v])=>`<div class="ov-stat-row"><span class="ov-stat-l">${l}</span><span class="ov-stat-v" style="${!l?'color:var(--amber);width:100%;text-align:center':''}">${v}</span></div>`).join('');

        document.getElementById('resumeBtn').style.display='none';
        document.getElementById('shareBtn').style.display='';
        document.getElementById('gameOverlay').classList.remove('hidden');

        // PB flash on board
        if(isPB){
            const flash=document.getElementById('pbFlash');
            if(flash){flash.classList.remove('show');void flash.offsetWidth;flash.classList.add('show');}
        }

        this.stats.record(s);
        this.lb.add(s.mode,{score:s.score,lines:s.lines,time:s.elapsedTime,pps:s.pps,date:new Date().toISOString()});
        this.audio.play(s.lines>0&&isWin?'glypfall':'gameOver');
        // Trigger board grey-out animation
        s.gameOverAnim.active=true; s.gameOverAnim.progress=0;

        // Store result string for sharing
        this._lastResultStr=this._buildResultString(s,isPB);
    }

    _buildResultString(s,isPB){
        const modeMap={sprint:'40L Sprint',marathon:'Marathon',ultra:'Ultra',zen:'Zen',surge:'Surge',blindfall:'Blindfall',flux:'Flux'};
        const modeName=modeMap[s.mode]||s.mode;
        const mainStat=s.mode==='sprint'?`Time: ${this.ui.fmtTime(s.elapsedTime)}`:`Score: ${s.score.toLocaleString()}`;
        return `GLYPFALL — ${modeName}\n${mainStat} | Lines: ${s.lines} | PPS: ${s.pps.toFixed(2)} | APM: ${Math.floor(s.apm)}${isPB?' [NEW PB]':''}`;
    }

    shareResult(){
        const btn=document.getElementById('shareBtn');
        if(!this._lastResultStr) return;
        try{ navigator.clipboard.writeText(this._lastResultStr); }
        catch(e){
            const ta=document.createElement('textarea');ta.value=this._lastResultStr;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);
        }
        btn.textContent='Copied!'; btn.classList.add('copied');
        setTimeout(()=>{btn.textContent='Copy Result';btn.classList.remove('copied');},2000);
    }

    copyTop3(){
        const activeTab=document.querySelector('.tab-btn.active');
        if(!activeTab) return;
        const mode=activeTab.dataset.mode;
        const entries=this.lb.get(mode).slice(0,3);
        if(!entries.length) return;
        const modeLabel=mode.charAt(0).toUpperCase()+mode.slice(1);
        const lines=entries.map((e,i)=>{
            const main=mode==='sprint'?this.ui.fmtTime(e.time):e.score.toLocaleString();
            return `${i+1}. ${main}  ${e.lines}L  ${e.pps.toFixed(2)} PPS`;
        });
        const text=`GLYPFALL — ${modeLabel} Top 3\n${lines.join('\n')}`;
        try{ navigator.clipboard.writeText(text); }
        catch(e){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);}
        const btn=document.getElementById('copyTop3Btn');
        if(btn){btn.textContent='Copied!';setTimeout(()=>btn.textContent='Copy Top 3',2000);}
    }

    populateStats(){
        const d=this.stats.data,ms=d.totalTime,h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000);
        // Count-up animation helper
        const countUp=(el,target,fmt,duration=600)=>{
            if(!el) return;
            const start=performance.now(),from=0;
            const step=now=>{
                const p=Math.min(1,(now-start)/duration);
                const ease=1-Math.pow(1-p,3);
                const val=Math.round(from+(target-from)*ease);
                el.textContent=fmt(val);
                if(p<1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        countUp(document.getElementById('totalGames'),d.totalGames,v=>v);
        countUp(document.getElementById('totalLines'),d.totalLines,v=>v.toLocaleString());
        countUp(document.getElementById('totalPieces'),d.totalPieces,v=>v.toLocaleString());
        countUp(document.getElementById('totalScore'),d.totalScore,v=>v.toLocaleString(),800);
        document.getElementById('totalTime').textContent=`${h}h ${m}m`;
        document.getElementById('bestPPS').textContent=d.bestPPS.toFixed(2);
        document.getElementById('avgPPS').textContent=d.avgPPS.toFixed(2);
        document.getElementById('streakCurrent').textContent=this.streak.data.current;
        document.getElementById('streakBest').textContent=this.streak.data.best;
        document.getElementById('streakFlame').textContent='/';

        // Mode PB breakdown
        const modeBreakEl=document.getElementById('modeBreakdown');
        if(modeBreakEl){
            const modes=['sprint','marathon','ultra','surge','blindfall','flux','zen'];
            const labels={sprint:'Sprint',marathon:'Marathon',ultra:'Ultra',surge:'Surge',blindfall:'Blindfall',flux:'Flux',zen:'Zen'};
            const rows=modes.map(mode=>{
                const pb=this.pb.get(mode);
                if(!pb) return null;
                const val=mode==='sprint'?this.ui.fmtTime(pb.time):pb.score.toLocaleString();
                return `<div class="mb-row"><span class="mb-mode">${labels[mode]}</span><span class="mb-val">${val}</span></div>`;
            }).filter(Boolean);
            modeBreakEl.innerHTML=rows.length?rows.join(''):'<div class="mb-empty">No records yet</div>';
        }

        // Sparkline — last 7 games scores from leaderboard
        const sparkEl=document.getElementById('sparklineCanvas');
        if(sparkEl){
            const allEntries=[];
            ['marathon','ultra','sprint','surge','flux','blindfall','zen'].forEach(mode=>{
                this.lb.get(mode).forEach(e=>allEntries.push({...e,mode}));
            });
            allEntries.sort((a,b)=>new Date(a.date)-new Date(b.date));
            const last7=allEntries.slice(-7);
            this._drawSparkline(sparkEl,last7);
        }

        // Best game
        const bgSection=document.getElementById('bestGameSection'),bgCards=document.getElementById('bestGameCards');
        if(d.bestGame&&bgSection&&bgCards){
            bgSection.style.display='';
            const bg=d.bestGame;
            const modeMap={sprint:'Sprint',marathon:'Marathon',ultra:'Ultra',zen:'Zen',surge:'Surge',blindfall:'Blindfall',flux:'Flux'};
            bgCards.innerHTML=[
                ['MODE',(modeMap[bg.mode]||bg.mode).toUpperCase()],
                ['SCORE',bg.score.toLocaleString()],
                ['LINES',bg.lines],
                ['PPS',bg.pps],
                ['APM',bg.apm],
                ['TIME',this.ui.fmtTime(bg.time)]
            ].map(([l,v])=>`<div class="bg-card"><div class="bg-label">${l}</div><div class="bg-val">${v}</div></div>`).join('');
        }
    }

    _drawSparkline(canvas,entries){
        const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
        ctx.clearRect(0,0,w,h);
        if(entries.length<2) {
            ctx.fillStyle='rgba(255,255,255,0.08)';
            ctx.font='9px JetBrains Mono,monospace';
            ctx.fillText('Play more games to see sparkline',4,h/2+3);
            return;
        }
        const vals=entries.map(e=>e.score||0);
        const mn=Math.min(...vals),mx=Math.max(...vals);
        const range=mx-mn||1;
        const pad=6,iw=w-pad*2,ih=h-pad*2;
        const pts=vals.map((v,i)=>({
            x:pad+i*(iw/(entries.length-1)),
            y:pad+ih-(((v-mn)/range)*ih)
        }));
        // Fill
        ctx.beginPath();
        ctx.moveTo(pts[0].x,h);
        pts.forEach(p=>ctx.lineTo(p.x,p.y));
        ctx.lineTo(pts[pts.length-1].x,h);
        ctx.closePath();
        const fill=ctx.createLinearGradient(0,0,0,h);
        fill.addColorStop(0,'rgba(255,255,255,0.12)');
        fill.addColorStop(1,'rgba(255,255,255,0.01)');
        ctx.fillStyle=fill; ctx.fill();
        // Line
        ctx.beginPath();
        ctx.moveTo(pts[0].x,pts[0].y);
        pts.forEach(p=>ctx.lineTo(p.x,p.y));
        ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=1.5;
        ctx.lineJoin='round'; ctx.stroke();
        // Dots
        pts.forEach((p,i)=>{
            ctx.beginPath(); ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
            ctx.fillStyle=i===pts.length-1?'#fff':'rgba(255,255,255,0.4)';
            ctx.fill();
        });
    }

    showLeaderboard(){
        this.updateLeaderboard('sprint');
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode==='sprint'));
        const c3=document.getElementById('copyTop3Btn');
        if(c3&&!c3._wired){ c3._wired=true; c3.addEventListener('click',()=>this.copyTop3()); }
    }

    updateLeaderboard(mode){
        // Dynamic column header
        const scoreHeader=document.getElementById('lbScoreHeader');
        if(scoreHeader) scoreHeader.textContent=mode==='sprint'?'Time':'Score';

        const tbody=document.getElementById('leaderboardBody');
        const entries=this.lb.get(mode);
        if(!entries.length){
            tbody.innerHTML=`<tr><td colspan="5" class="lb-empty"><span class="icon-empty-board"></span><br>No entries yet</td></tr>`;
            return;
        }
        const todayStr=new Date().toDateString();
        tbody.innerHTML=entries.map((e,i)=>{
            const main=mode==='sprint'?this.ui.fmtTime(e.time):e.score.toLocaleString();
            const entryDate=new Date(e.date);
            const isToday=entryDate.toDateString()===todayStr;
            const dateStr=isToday?'<span class="lb-today">today</span>':entryDate.toLocaleDateString();
            const rank=i===0?'<span class="icon-crown"></span>':i===1?'<span class="rank-2">2</span>':i===2?'<span class="rank-3">3</span>':(i+1);
            return `<tr class="${i===0?'lb-top':i===1?'lb-two':i===2?'lb-three':''}"><td>${rank}</td><td class="lb-main">${main}</td><td class="lb-r">${e.lines}</td><td class="lb-r">${e.pps.toFixed(2)}</td><td class="lb-r">${dateStr}</td></tr>`;
        }).join('');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// BLOCK COLOR SYSTEM
// ═══════════════════════════════════════════════════════════════════════════
const BC_KEY='glypfall_block_colors';
const BC_DEFAULTS={I:'#7eb8d4',O:'#c9a65b',T:'#cc1a1a',S:'#6b9e78',Z:'#c45c2a',J:'#3a5f8a',L:'#d4b896'};
const BC_PIECES=['I','O','T','S','Z','J','L'];

function bc_darken(hex,pct){const n=parseInt(hex.replace('#',''),16),a=Math.round(2.55*pct);return '#'+((1<<24)+(Math.max(0,(n>>16)-a)<<16)+(Math.max(0,((n>>8)&0xff)-a)<<8)+Math.max(0,(n&0xff)-a)).toString(16).slice(1);}

function bc_load(){
    try{
        const saved=JSON.parse(localStorage.getItem(BC_KEY)||'{}');
        BC_PIECES.forEach(p=>{TETROMINOES[p].color=saved[p]||BC_DEFAULTS[p];});
    }catch(e){}
    // Note: palette restore happens in bc_wirePalettes() after BC_PALETTES is defined
}

function bc_apply(piece,hex){
    TETROMINOES[piece].color=hex;
    const sw=document.getElementById('swatch-'+piece);
    if(sw){sw.style.background=hex;const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);sw.style.boxShadow=`0 0 8px rgba(${r},${g},${b},0.6)`;}
    const dark=bc_darken(hex,22);
    document.querySelectorAll(`.theme-swatch[data-piece="${piece}"]`).forEach(cell=>{
        cell.style.setProperty('--c',hex);cell.style.setProperty('--cd',dark);
        if(cell.classList.contains('neon-prev')){cell.style.background=hex;cell.style.boxShadow=`0 0 8px ${hex}, 0 0 16px ${hex}`;}
    });
}

function bc_save(){const obj={};BC_PIECES.forEach(p=>{obj[p]=TETROMINOES[p].color;});try{localStorage.setItem(BC_KEY,JSON.stringify(obj));}catch(e){}}

function bc_syncUI(){BC_PIECES.forEach(p=>{const hex=TETROMINOES[p].color,input=document.getElementById('color-'+p);if(input)input.value=hex;bc_apply(p,hex);});}

function bc_reset(){BC_PIECES.forEach(p=>{TETROMINOES[p].color=BC_DEFAULTS[p];});try{localStorage.removeItem(BC_KEY);}catch(e){}bc_syncUI();}

function bc_wireInputs(){
    BC_PIECES.forEach(piece=>{
        const input=document.getElementById('color-'+piece);
        if(!input) return;
        input.addEventListener('input',e=>{
            bc_apply(piece,e.target.value);
            // Deselect palette when individual color changed
            document.querySelectorAll('.palette-opt').forEach(b=>b.classList.remove('active'));
            try{localStorage.removeItem('glypfall_palette');}catch(e2){}
        });
    });
    const saveBtn=document.getElementById('saveColors');
    if(saveBtn) saveBtn.addEventListener('click',()=>{
        BC_PIECES.forEach(p=>{const input=document.getElementById('color-'+p);if(input)bc_apply(p,input.value);});
        bc_save();
        saveBtn.textContent='✓  Saved!';saveBtn.classList.add('saved');
        setTimeout(()=>{saveBtn.textContent='↳  Save Colors';saveBtn.classList.remove('saved');},1800);
    });
    const resetBtn=document.getElementById('resetColors');
    if(resetBtn) resetBtn.addEventListener('click',bc_reset);
}

const BC_PALETTES = {
    default: {I:'#7eb8d4',O:'#c9a65b',T:'#cc1a1a',S:'#6b9e78',Z:'#c45c2a',J:'#3a5f8a',L:'#d4b896'},
    classic: {I:'#00cfff',O:'#ffe600',T:'#cc44ff',S:'#44ee88',Z:'#ff4444',J:'#4488ff',L:'#ff8800'},
    mono:    {I:'#ffffff',O:'#d8d8d8',T:'#b0b0b0',S:'#888888',Z:'#606060',J:'#404040',L:'#c8c8c8'},
    ocean:   {I:'#7ff0ff',O:'#b8f0ff',T:'#4488dd',S:'#22bbcc',Z:'#0055aa',J:'#88ddff',L:'#55aacc'},
    ember:   {I:'#ffee88',O:'#ffcc44',T:'#ff8833',S:'#ff5522',Z:'#cc2200',J:'#ffaa66',L:'#ff6644'},
};

function bc_applyPalette(name){
    const pal=BC_PALETTES[name]; if(!pal) return;
    BC_PIECES.forEach(p=>{
        TETROMINOES[p].color=pal[p];
        const input=document.getElementById('color-'+p);
        if(input) input.value=pal[p];
        bc_apply(p,pal[p]);
    });
    bc_save();
    document.querySelectorAll('.palette-opt').forEach(b=>b.classList.toggle('active',b.dataset.palette===name));
    try{localStorage.setItem('glypfall_palette',name);}catch(e){}
}

function bc_wirePalettes(){
    const saved=localStorage.getItem('glypfall_palette')||'default';
    // Apply palette colors immediately on init
    if(BC_PALETTES[saved]) bc_applyPalette(saved);
    document.querySelectorAll('.palette-opt').forEach(btn=>{
        btn.classList.toggle('active',btn.dataset.palette===saved);
        btn.addEventListener('click',()=>bc_applyPalette(btn.dataset.palette));
    });
}
// ═══════════════════════════════════════════════════════════════════════════
const ACCENT_KEY='glypfall_accent';

function accent_apply(hex){
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    const root=document.documentElement;
    root.style.setProperty('--accent',hex);
    root.style.setProperty('--accent-dim',`rgba(${r},${g},${b},0.1)`);
    root.style.setProperty('--accent-glow',`rgba(${r},${g},${b},0.25)`);
    root.style.setProperty('--border-b',`rgba(${r},${g},${b},0.4)`);
    document.querySelectorAll('.panel-lbl,.sgroup-title,.bh-mode').forEach(el=>el.style.color=hex);
}

function accent_wire(){
    const saved=localStorage.getItem(ACCENT_KEY)||'#ffffff';
    const input=document.getElementById('accentColor');
    if(input) input.value=saved;
    accent_apply(saved);
    document.querySelectorAll('.accent-preset').forEach(btn=>{
        btn.classList.toggle('active',btn.dataset.color===saved);
        btn.addEventListener('click',e=>{
            e.preventDefault();const hex=btn.dataset.color;
            if(input) input.value=hex;
            document.querySelectorAll('.accent-preset').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active'); accent_apply(hex);
            try{localStorage.setItem(ACCENT_KEY,hex);}catch(e2){}
        });
    });
    if(input){
        input.addEventListener('input',e=>{
            document.querySelectorAll('.accent-preset').forEach(b=>b.classList.remove('active'));
            accent_apply(e.target.value);
            try{localStorage.setItem(ACCENT_KEY,e.target.value);}catch(e2){}
        });
    }
}

// ── Boot ──────────────────────────────────────────────────────────────────────
// Apply reduced-motion BEFORE anything renders to avoid flash
(function(){
    try{
        const s=JSON.parse(localStorage.getItem('glypfallSettings')||'{}');
        if(s.reducedMotion) document.documentElement.classList.add('reduced-motion');
    }catch(e){}
})();

bc_load(); // loads individual colors only; palette applied below after BC_PALETTES defined

let game;
window.addEventListener('DOMContentLoaded',()=>{
    game=new Game();

    // Remove splash from DOM entirely after animation so it can't block touches
    const splash=document.getElementById('splashScreen');
    if(splash){
        splash.addEventListener('animationend',(e)=>{
            // Only react to the splash's own splashOut animation, not bubbled child animations
            if(e.target===splash && e.animationName==='splashOut'){
                splash.style.display='none';
                splash.style.pointerEvents='none';
            }
        });
        // Fallback: force hide after 5.5s
        setTimeout(()=>{ splash.style.display='none'; splash.style.pointerEvents='none'; }, 5500);
    }

    function scaleGame(){
        const layout=document.querySelector('.game-layout');
        if(!layout) return;
        const vw=window.innerWidth, vh=window.innerHeight;
        const isMobile=vw<=700;
        if(isMobile){
            // On mobile, hide side panels and scale board to fill width
            const boardWidth=300, padding=20;
            const scaleW=(vw-padding)/boardWidth;
            const scaleH=(vh*0.72)/600; // leave room for controls
            const scale=Math.min(scaleW,scaleH,1.2);
            layout.style.transform=`scale(${scale})`;
            layout.style.transformOrigin='top center';
        } else {
            const scaleH=(vh-10)/(layout.scrollHeight||720);
            const scaleW=(vw-10)/(layout.scrollWidth||620);
            const scale=Math.min(1,scaleH,scaleW);
            layout.style.transform=scale<1?`scale(${scale})`:'';
            layout.style.transformOrigin='top center';
        }
    }
    scaleGame();
    window.addEventListener('resize',scaleGame);

    // Show main menu after splash
    setTimeout(()=>{
        document.getElementById('mainMenu').classList.add('active');
    }, 1700);
});