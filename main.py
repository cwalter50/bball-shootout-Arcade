@namespace
class SpriteKind:
    Hoop = SpriteKind.create()
@namespace
class StatusBarKind:
    Accuracy = StatusBarKind.create()

def on_status_reached_comparison_eq_type_percentage(status):
    global changeTimerBy
    changeTimerBy = 2
statusbars.on_status_reached(StatusBarKind.Accuracy,
    statusbars.StatusComparison.EQ,
    statusbars.ComparisonType.PERCENTAGE,
    0,
    on_status_reached_comparison_eq_type_percentage)

def on_a_pressed():
    global startStatusBar, projectile
    if startStatusBar == 1:
        startStatusBar = 0
        statusbar.set_bar_size(0, 0)
        projectile = sprites.create_projectile_from_sprite(img("""
                . . . . . . . e e e e . . . . . 
                            . . . . . e e 4 5 5 5 e e . . . 
                            . . . . e 4 5 6 2 2 7 6 6 e . . 
                            . . . e 5 6 6 7 2 2 6 4 4 4 e . 
                            . . e 5 2 2 7 6 6 4 5 5 5 5 4 . 
                            . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4 
                            . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4 
                            e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4 
                            e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4 
                            e 5 c c e 5 4 5 5 5 4 5 5 5 e . 
                            e 5 c c 5 5 5 5 5 5 5 5 4 e . . 
                            e 5 e c 5 4 5 4 5 5 5 e e . . . 
                            e 5 e e 5 5 5 5 5 4 e . . . . . 
                            4 5 4 e 5 5 5 5 e e . . . . . . 
                            . 4 5 4 5 5 4 e . . . . . . . . 
                            . . 4 4 e e e . . . . . . . . .
            """),
            mySprite,
            shotVx(),
            10 - mySprite.y)
    else:
        startStatusBar = 1
        statusbar.value = 0
        statusbar.set_bar_size(20, 4)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Hoop, on_on_overlap)

def on_status_reached_comparison_eq_type_percentage2(status2):
    global changeTimerBy
    changeTimerBy = -2
statusbars.on_status_reached(StatusBarKind.Accuracy,
    statusbars.StatusComparison.EQ,
    statusbars.ComparisonType.PERCENTAGE,
    100,
    on_status_reached_comparison_eq_type_percentage2)

def shotVx():
    return 80 - (mySprite.x - (statusbar.max - statusbar.value))
projectile: Sprite = None
startStatusBar = 0
changeTimerBy = 0
statusbar: StatusBarSprite = None
mySprite: Sprite = None
scene.set_background_image(assets.image("""
    court
"""))
mySprite = sprites.create(img("""
        . . . . f f f f f . . . . . . . 
            . . . f e e e e e f . . . . . . 
            . . f d d d d e e e f . . . . . 
            . c d f d d f d e e f f . . . . 
            . c d f d d f d e e d d f . . . 
            c d e e d d d d e e b d c . . . 
            c d d d d c d d e e b d c . f f 
            c c c c c d d d e e f c . f e f 
            . f d d d d d e e f f . . f e f 
            . . f f f f f e e e e f . f e f 
            . . . . f e e e e e e e f f e f 
            . . . f e f f e f e e e e f f . 
            . . . f e f f e f e e e e f . . 
            . . . f d b f d b f f e f . . . 
            . . . f d d c d d b b d f . . . 
            . . . . f f f f f f f f f . . .
    """),
    SpriteKind.player)
controller.move_sprite(mySprite)
mySprite.set_stay_in_screen(True)
statusbar = statusbars.create(20, 4, StatusBarKind.Accuracy)
statusbar.attach_to_sprite(mySprite)
statusbar.set_bar_size(0, 0)
Hoop2 = sprites.create(assets.image("""
    Hoop
"""), SpriteKind.Hoop)
Hoop2.set_position(80, 10)

def on_update_interval():
    if startStatusBar == 1:
        statusbar.value += changeTimerBy
game.on_update_interval(20, on_update_interval)
