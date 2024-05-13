namespace SpriteKind {
    export const Hoop = SpriteKind.create()
    export const openBall = SpriteKind.create()
    export const p2Projectile = SpriteKind.create()
    export const p1Projectile = SpriteKind.create()
}
namespace StatusBarKind {
    export const Accuracy = StatusBarKind.create()
    export const Player1 = StatusBarKind.create()
    export const Player2 = StatusBarKind.create()
}
statusbars.onStatusReached(StatusBarKind.Player2, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 0, function (status) {
    changeP2TimerBy = 2
})
sprites.onOverlap(SpriteKind.p2Projectile, SpriteKind.Hoop, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.player2.changeScoreBy(2)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
statusbars.onStatusReached(StatusBarKind.Player1, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 100, function (status2) {
    changeP1TimerBy = -2
})
function shotVyP1 (theSprite: Sprite) {
    if (randint(1, 2) == 1) {
        return 18 - (theSprite.y - (p1StatusBar.max - p1StatusBar.value))
    } else {
        return 18 - (theSprite.y + (p1StatusBar.max - p1StatusBar.value))
    }
}
statusbars.onStatusReached(StatusBarKind.Player2, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 100, function (status2) {
    changeP2TimerBy = -2
})
sprites.onOverlap(SpriteKind.p1Projectile, SpriteKind.Hoop, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.player1.changeScoreBy(2)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
function shotvXP1 (theSprite: Sprite) {
    if (randint(1, 2) == 1) {
        return 80 - (theSprite.x + (p1StatusBar.max - p1StatusBar.value))
    } else {
        return 80 - (theSprite.x - (p1StatusBar.max - p1StatusBar.value))
    }
}
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
        if (startP1StatusBar == 1 && p1HasBall == 1) {
            startP1StatusBar = 0
            p1StatusBar.setBarSize(0, 0)
            projectile = sprites.createProjectileFromSprite(assets.image`Ball`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), shotvXP1(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))), shotVyP1(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))))
            projectile.setKind(SpriteKind.p1Projectile)
            p1HasBall = 0
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f 2 2 f f f . . . . 
                . . . f f f 2 2 2 2 f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e 2 2 2 2 2 2 e e f . . 
                . . f e 2 f f f f f f 2 e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 4 1 f d d f 1 4 e e f . 
                . . f e e d d d d d d e e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 2 2 2 2 2 2 f 4 e . . 
                . . 4 d f 2 2 2 2 2 2 f d 4 . . 
                . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (startP1StatusBar == 0 && p1HasBall == 1) {
            startP1StatusBar = 1
            p1StatusBar.value = 0
            p1StatusBar.setBarSize(20, 4)
        } else {
            startP1StatusBar = 0
            p1StatusBar.value = 0
            p1StatusBar.setBarSize(0, 0)
        }
    } else {
        if (startP2StatusBar == 1 && p2HasBall == 1) {
            startP2StatusBar = 0
            p2StatusBar.setBarSize(0, 0)
            projectile = sprites.createProjectileFromSprite(assets.image`Ball`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), shotvXP2(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))), shotVyP2(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))
            projectile.setKind(SpriteKind.p2Projectile)
            p2HasBall = 0
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(img`
                . . . . . f f 4 4 f f . . . . . 
                . . . . f 5 4 5 5 4 5 f . . . . 
                . . . f e 4 5 5 5 5 4 e f . . . 
                . . f b 3 e 4 4 4 4 e 3 b f . . 
                . . f 3 3 3 3 3 3 3 3 3 3 f . . 
                . f 3 3 e b 3 e e 3 b e 3 3 f . 
                . f 3 3 f f e e e e f f 3 3 f . 
                . f b b f b f e e f b f b b f . 
                . f b b e 1 f 4 4 f 1 e b b f . 
                f f b b f 4 4 4 4 4 4 f b b f f 
                f b b f f f e e e e f f f b b f 
                . f e e f b d d d d b f e e f . 
                . . e 4 c d d d d d d c 4 e . . 
                . . e f b d b d b d b b f e . . 
                . . . f f 1 d 1 d 1 d f f . . . 
                . . . . . f f b b f f . . . . . 
                `)
        } else if (startP2StatusBar == 0 && p2HasBall == 1) {
            startP2StatusBar = 1
            p2StatusBar.value = 0
            p2StatusBar.setBarSize(20, 4)
        } else {
            startP2StatusBar = 0
            p2StatusBar.value = 0
            p2StatusBar.setBarSize(0, 0)
        }
    }
})
statusbars.onStatusReached(StatusBarKind.Player1, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 0, function (status) {
    changeP1TimerBy = 2
})
function shotvXP2 (theSprite: Sprite) {
    if (randint(1, 2) == 1) {
        return 80 - (theSprite.x + (p2StatusBar.max - p2StatusBar.value))
    } else {
        return 80 - (theSprite.x - (p2StatusBar.max - p2StatusBar.value))
    }
}
info.onCountdownEnd(function () {
    music.setVolume(0)
    music.stopAllSounds()
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.openBall, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))) {
        p1HasBall = 1
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setImage(assets.image`p1Sprite`)
    } else {
        p2HasBall = 1
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`p2Ball`)
    }
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
})
function shotVyP2 (theSprite: Sprite) {
    if (randint(1, 2) == 1) {
        return 18 - (theSprite.y - (p2StatusBar.max - p2StatusBar.value))
    } else {
        return 18 - (theSprite.y + (p2StatusBar.max - p2StatusBar.value))
    }
}
function playBullsThemeSong2 () {
    music.play(music.createSong(assets.song`BullsTheme`), music.PlaybackMode.LoopingInBackground)
}
mp.onControllerEvent(ControllerEvent.Connected, function (player2) {
    info.startCountdown(30)
    if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
        mp.setPlayerSprite(player2, sprites.create(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `, SpriteKind.Player))
        p1StatusBar = statusbars.create(20, 4, StatusBarKind.Player1)
        p1StatusBar.attachToSprite(mp.getPlayerSprite(player2))
        p1StatusBar.setBarSize(0, 0)
    } else {
        mp.setPlayerSprite(player2, sprites.create(img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f 3 3 f f e e e e f f 3 3 f . 
            . f b b f b f e e f b f b b f . 
            . f b b e 1 f 4 4 f 1 e b b f . 
            f f b b f 4 4 4 4 4 4 f b b f f 
            f b b f f f e e e e f f f b b f 
            . f e e f b d d d d b f e e f . 
            . . e 4 c d d d d d d c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . . 
            `, SpriteKind.Player))
        p2StatusBar = statusbars.create(20, 4, StatusBarKind.Player2)
        p2StatusBar.attachToSprite(mp.getPlayerSprite(player2))
        p2StatusBar.setBarSize(0, 0)
    }
    mp.moveWithButtons(player2)
    mp.getPlayerSprite(player2).setStayInScreen(true)
})
function playBullsThemeSong () {
    if (game.runtime() < 30000) {
        music.play(music.tonePlayable(247, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
        music.ringTone(659)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(740)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(988)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(494)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(659)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(740)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(880)
        music.rest(music.beat(BeatFraction.Quarter))
        music.ringTone(494)
        music.rest(music.beat(BeatFraction.Quarter))
    } else {
        music.setVolume(0)
    }
}
let openBBall: Sprite = null
let p2StatusBar: StatusBarSprite = null
let p2HasBall = 0
let startP2StatusBar = 0
let projectile: Sprite = null
let p1HasBall = 0
let startP1StatusBar = 0
let p1StatusBar: StatusBarSprite = null
let changeP1TimerBy = 0
let changeP2TimerBy = 0
scene.setBackgroundImage(assets.image`court`)
let Hoop2 = sprites.create(assets.image`Hoop`, SpriteKind.Hoop)
Hoop2.setPosition(80, 18)
game.splash("Welcome to BBall Shootout")
music.setVolume(80)
music.setTempo(55)
playBullsThemeSong2()
game.onUpdateInterval(2000, function () {
    openBBall = sprites.create(assets.image`Ball`, SpriteKind.openBall)
    openBBall.setPosition(randint(0, 160), randint(0, 120))
})
game.onUpdateInterval(20, function () {
    if (startP1StatusBar == 1) {
        p1StatusBar.value += changeP1TimerBy
    }
    if (startP2StatusBar == 1) {
        p2StatusBar.value += changeP2TimerBy
    }
})
forever(function () {
	
})
