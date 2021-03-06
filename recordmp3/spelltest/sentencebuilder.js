
 
buzz.defaults.formats = [ 'ogg', 'mp3' ];
buzz.defaults.preload = 'metadata';

var games = [
    { img: 'play.png', color:'#666600', word: 'probable', sound: 'sounds/probable' },
	{ img: 'play.png', color:'#808000', word: 'entrance', sound: 'sounds/entrance' }, 
	{ img: 'play.png', color:'#999900', word: 'carpe diem', sound: 'sounds/carpediem' }, 
	{ img: 'play.png', color:'#B2B200', word: 'megabytes', sound: 'sounds/megabyte' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'gigabytes', sound: 'sounds/gigabytes' }, 
	{ img: 'play.png', color:'#E6E600', word: 'kilobytes', sound: 'sounds/kilobytes' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'kilometers', sound: 'sounds/kilometers' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'kilograms', sound: 'sounds/kilograms' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'terabyte', sound: 'sounds/terabyte' },
	{ img: 'play.png', color:'#666600', word: 'fibre optics', sound: 'sounds/fibreoptics' }, 
	{ img: 'play.png', color:'#808000', word: 'javascript', sound: 'sounds/javascript' }, 
	{ img: 'play.png', color:'#999900', word: 'browser', sound: 'sounds/browser' }, 
	{ img: 'play.png', color:'#B2B200', word: 'medium', sound: 'sounds/medium' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'psuedo', sound: 'sounds/psuedo' }, 
	{ img: 'play.png', color:'#E6E600', word: 'faux', sound: 'sounds/faux' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'quantitative', sound: 'sounds/quantitative' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'qualitative', sound: 'sounds/qualitative' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'statistics', sound: 'sounds/statistics' },
	{ img: 'play.png', color:'#666600', word: 'improbable', sound: 'sounds/improbable' }, 
	{ img: 'play.png', color:'#808000', word: 'thesis', sound: 'sounds/thesis' }, 
	{ img: 'play.png', color:'#999900', word: 'theocracy', sound: 'sounds/theocracy' }, 
	{ img: 'play.png', color:'#B2B200', word: 'delusions', sound: 'sounds/delusions' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'evolution', sound: 'sounds/evolution' }, 
	{ img: 'play.png', color:'#E6E600', word: 'genetics', sound: 'sounds/genetics' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'geothermal', sound: 'sounds/geothermal' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'hydraulic', sound: 'sounds/hydraulic' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'sonography', sound: 'sounds/sonography' },
	{ img: 'play.png', color:'#666600', word: 'license', sound: 'sounds/license' }, 
	{ img: 'play.png', color:'#808000', word: 'ligament', sound: 'sounds/ligament' }, 
	{ img: 'play.png', color:'#999900', word: 'ignorance', sound: 'sounds/ignorance' }, 
	{ img: 'play.png', color:'#B2B200', word: 'inductive', sound: 'sounds/inductive' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'deductive', sound: 'sounds/deductive' }, 
	{ img: 'play.png', color:'#E6E600', word: 'infrared', sound: 'sounds/infrared' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'distillation', sound: 'sounds/distillation' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'fermentation', sound: 'sounds/fermentation' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'hemoglobin', sound: 'sounds/hemoglobin' },
	{ img: 'play.png', color:'#666600', word: 'economics', sound: 'sounds/economics' }, 
	{ img: 'play.png', color:'#808000', word: 'acumen', sound: 'sounds/acumen' }, 
	{ img: 'play.png', color:'#999900', word: 'enterprise', sound: 'sounds/enterprise' }, 
	{ img: 'play.png', color:'#B2B200', word: 'abandoned', sound: 'sounds/abandoned' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'nuclear', sound: 'sounds/nuclear' }, 
	{ img: 'play.png', color:'#E6E600', word: 'null', sound: 'sounds/null' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'refurbished', sound: 'sounds/refurbished' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'aerodynamic', sound: 'sounds/aerodynamic' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'embarrassing', sound: 'sounds/embarrassing' },
	{ img: 'play.png', color:'#666600', word: 'inconvenience', sound: 'sounds/inconvenience' }, 
	{ img: 'play.png', color:'#808000', word: 'empathetic', sound: 'sounds/empathetic' }, 
	{ img: 'play.png', color:'#999900', word: 'numerous', sound: 'sounds/numerous' }, 
	{ img: 'play.png', color:'#B2B200', word: 'anonymous', sound: 'sounds/anonymous' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'onomatopoeia', sound: 'sounds/onomatopoeia' }, 
	{ img: 'play.png', color:'#E6E600', word: 'rendition', sound: 'sounds/rendition' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'protein', sound: 'sounds/protein' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'carbohydrates', sound: 'sounds/carbohydrates' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'mitochondria', sound: 'sounds/mitochondria' },
	{ img: 'play.png', color:'#666600', word: 'bacteria', sound: 'sounds/bacteria' }, 
	{ img: 'play.png', color:'#808000', word: 'biochemical', sound: 'sounds/biochemical' }, 
	{ img: 'play.png', color:'#999900', word: 'membrane', sound: 'sounds/membrane' }, 
	{ img: 'play.png', color:'#B2B200', word: 'techniques', sound: 'sounds/techniques' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'chromosomes', sound: 'sounds/chromosomes' }, 
	{ img: 'play.png', color:'#E6E600', word: 'linear', sound: 'sounds/linear' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'molecule', sound: 'sounds/molecule' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'speculation', sound: 'sounds/speculation' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'algorithm', sound: 'sounds/algorithm' },
	{ img: 'play.png', color:'#666600', word: 'referendums', sound: 'sounds/referendums' }, 
	{ img: 'play.png', color:'#808000', word: 'meta-analysis', sound: 'sounds/meta-analysis' }, 
	{ img: 'play.png', color:'#999900', word: 'commercial', sound: 'sounds/commercial' }, 
	{ img: 'play.png', color:'#B2B200', word: 'cognitive', sound: 'sounds/cognitive' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'perceived', sound: 'sounds/perceived' }, 
	{ img: 'play.png', color:'#E6E600', word: 'consequence', sound: 'sounds/consequence' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'terrestrial', sound: 'sounds/terrestrial' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'malignant', sound: 'sounds/malignant' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'peculiar', sound: 'sounds/peculiar' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'revitalize', sound: 'sounds/revitalize' },
	{ img: 'play.png', color:'#666600', word: 'consciousness', sound: 'sounds/consciousness' }, 
	{ img: 'play.png', color:'#808000', word: 'programmable', sound: 'sounds/programmable' }, 
	{ img: 'play.png', color:'#999900', word: 'numerous', sound: 'sounds/numerous' }, 
	{ img: 'play.png', color:'#B2B200', word: 'neuroscience', sound: 'sounds/neuroscience' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'extraordinary', sound: 'sounds/extraordinary' }, 
	{ img: 'play.png', color:'#E6E600', word: 'nowadays', sound: 'sounds/nowadays' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'spectacular', sound: 'sounds/spectacular' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'infection', sound: 'sounds/infection' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'infrastructure', sound: 'sounds/infrastructure' },
	{ img: 'play.png', color:'#666600', word: 'assessment', sound: 'sounds/assessment' }, 
	{ img: 'play.png', color:'#808000', word: 'legislation', sound: 'sounds/legislation' }, 
	{ img: 'play.png', color:'#999900', word: 'orwellian', sound: 'sounds/orwellian' }, 
	{ img: 'play.png', color:'#B2B200', word: 'linguist', sound: 'sounds/linguist' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'ostentatiously', sound: 'sounds/ostentatiously' }, 
	{ img: 'play.png', color:'#E6E600', word: 'idiosyncratic', sound: 'sounds/idiosyncratic' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'vigorous', sound: 'sounds/vigorous' }, 
	{ img: 'play.png', color:'#FFFF19', word: 'canonized', sound: 'sounds/canonized' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'analogy', sound: 'sounds/analogy' },
	{ img: 'play.png', color:'#666600', word: 'fallacy', sound: 'sounds/fallacy' }, 
	{ img: 'play.png', color:'#808000', word: 'exonerative', sound: 'sounds/exonerative' }, 
	{ img: 'play.png', color:'#999900', word: 'unassertiveness', sound: 'sounds/unassertiveness' }, 
	{ img: 'play.png', color:'#B2B200', word: 'culpable', sound: 'sounds/culpable' }, 
	{ img: 'play.png', color:'#CCCC00', word: 'dispossessed', sound: 'sounds/dispossessed' }, 
	{ img: 'play.png', color:'#E6E600', word: 'cadence', sound: 'sounds/cadence' }, 
	{ img: 'play.png', color:'#FFFF00', word: 'inhabitants', sound: 'sounds/inhabitants' }, 
	{ img: 'play.png', color:'#FFFF33', word: 'narcissistic', sound: 'sounds/narcissistic' }
];

var winSound        = new buzz.sound('sounds/win' ),
    errorSound      = new buzz.sound('sounds/error' ),
    alphabetSounds  = {},
    alphabet        = 'abcdefghijklmnopqrstuvwxyz'.split( '' ),
	scoreKK			= 0,
	ez				= false,
	scoreK,	
	gameSound;

	var NumOfQues = games.length;
	var ScoreTotal = NumOfQues * 10;
	var PercentTotal;
	
for( var i in alphabet ) {
    var letter = alphabet[ i ];
    alphabetSounds[ letter ] = new buzz.sound('sounds/kid/'+ letter );
}

$( function() {
    if ( !buzz.isSupported() ) {
        $('#warning').show();
    }

    var idx = 0,
        $container  = $( '#container' ),
        $picture    = $( '#picture' ),
        $models     = $( '#models' ),
        $letters    = $( '#letters' );

    $( 'body' ).bind('selectstart', function() { 
        return false 
    });

    $( '#next' ).click( function() {
		NumOfQues = NumOfQues - 1;
		PercentTotal = (scoreKK / ScoreTotal) * 100;
		document.getElementById( "score" ).innerHTML = "Score = " + scoreKK + " | Percent Correct = " + PercentTotal.toFixed(2) + "% | Remaining questions = " + NumOfQues; 
		refreshGame();
        buildGame( ++idx ); 
		return false;
    });

    $( '#previous' ).click( function() {
       refreshGame();
       buildGame( --idx ); 
       return false;
    });

    $( '#level' ).click( function() {
        if ( $( this ).text() == 'easy' ) {
            $( this ).text( 'hard' );
            $models.addClass( 'hard' );
			ez = false;
        } else {
            $( this ).text( 'easy' );
            $models.removeClass( 'hard' );
			ez = true;
			refreshGame(); 
			buildGame( idx );
			return false;
        }
        return false;
    });

    function refreshGame() {
		gameSound.stop();
        $( '#models' ).html( '' );
        $( '#letters' ).html( '' );
    }

    function buildGame( x ) {
        if ( x > games.length - 1 ) {
            idx = 0;
        }
        if ( x < 0 ) {
            idx = games.length - 1;
        }

        var game  = games[ idx ],
		scoreK = 0;
		
		if (NumOfQues == games.length) {
			PercentTotal = (scoreKK / ScoreTotal) * 100;
			document.getElementById( "score" ).innerHTML = "Score = " + scoreKK + " | Percent Correct = " + PercentTotal.toFixed(2) + "% | Remaining questions = " + NumOfQues; 
		}
		
        gameSound = new buzz.sound( game.sound );
		gameSound.load().play();

        // Fade the background color
        $( 'body' ).stop().animate({
            backgroundColor: game.color
        }, 1000);
        $( '#header a' ).stop().animate({
            color: game.color
        }, 1000);

        // Update the picture
        $picture.attr( 'src', game.img )
            .unbind( 'click' )
            .bind( 'click', function() {
				gameSound.increaseVolume(100);
				gameSound.play();
				console.log('played');
            });
		PercentTotal = (scoreKK / ScoreTotal) * 100;
		document.getElementById( "score" ).innerHTML = "Score = " + scoreKK + " | Percent Correct = " + PercentTotal.toFixed(2) + "% | Remaining questions = " + NumOfQues; 
        document.getElementById("sent").innerHTML = '<img id="picture" src="play.png">';

        // Build model
        var modelLetters = game.word.split( '' );

        for( var i in modelLetters ) {
            var letter = modelLetters[ i ];
            $models.append( '<li>' + letter + '</li>' );
        }

        var letterWidth = $models.find( 'li' ).outerWidth( true );

        $models.width( letterWidth * $models.find( 'li' ).length );

        // Build shuffled letters
		var letters = game.word.split('');
		if ( ez == false ) {
            letters.push('a','e','i','s','h','o','u');
			
        }
		
		var shuffled = letters.sort( function() { return Math.random() < 0.5 ? -1 : 1 });

        for( var i in shuffled ) {
            $letters.append( '<li class="draggable">' + shuffled[ i ] + '</li>' );
        }

        $letters.find( 'li' ).each( function( i ) {
            if (ez == false) {
				var top   = ( $models.position().top ) + ( Math.random() * 200 ) + 80,
					left  = ( $models.offset().left - $container.offset().left - 10) + ( Math.random() * 20 ) + ( i * letterWidth / 2),
					angle = ( Math.random() * 30 ) - 10;		
			} else {
				var top   = ( $models.position().top ) + ( Math.random() * 100 ) + 80,
                left  = ( $models.offset().left - $container.offset().left ) + ( Math.random() * 20 ) + ( i * letterWidth ),
                angle = ( Math.random() * 30 ) - 10;
			
			}
			
            $( this ).css({
                top:  top  + 'px',
                left: left + 'px'
            });

            rotate( this, angle );

            $( this ).mousedown( function() {
				gameSound.stop();
                var letter = $( this ).text();
                if ( alphabetSounds[ letter ] ) {
                    alphabetSounds[ letter ].play();
                }
            });
        });

        $letters.find( 'li.draggable' ).draggable({
            zIndex: 9999,
            stack: '#letters li'
        });

        $models.find( 'li' ).droppable( {
            accept:     '.draggable',
            hoverClass: 'hover',
            drop: function( e, ui ) {
                var modelLetter      = $( this ).text(),
                    droppedLetter = ui.helper.text();

                if ( modelLetter == droppedLetter ) {
                    ui.draggable.animate( {
                        top:     $( this ).position().top,
                        left:     $( this ).position().left
                    } ).removeClass( 'draggable' ).draggable( 'option', 'disabled', true );
                    
                    rotate( ui.draggable, 0 );
                    
                    scoreK++;
                    
                    if ( scoreK == modelLetters.length ) {
                        winGame();
                    }    
                } else {
                    ui.draggable.draggable( 'option', 'revert', true );	
					scoreKK = scoreKK - 10;
					PercentTotal = (scoreKK / ScoreTotal) * 100;
					document.getElementById( "score" ).innerHTML = "Score = " + scoreKK + " | Percent Correct = " + PercentTotal.toFixed(2) + "% | Remaining questions = " + NumOfQues; errorSound.play();
						
                    
                    errorSound.play();
                    
                    setTimeout( function() {
                        ui.draggable.draggable( 'option', 'revert', false );
                    }, 100 );
                }
            }
        });
    }

    function winGame() {
        winSound.play();
		if (ez == false) {
			scoreK = scoreK + 20;
		} else {
			scoreK = scoreK + 10;
		}
		
		scoreKK = scoreKK + 10;
		NumOfQues = NumOfQues - 1;
		if ( NumOfQues < 1) {
			PercentTotal = (scoreKK / ScoreTotal) * 100;
			document.getElementById( "score" ).innerHTML = "Score = " + scoreKK + " | Percent Correct = " + PercentTotal.toFixed(2) + "% | Remaining questions = " + NumOfQues; 
			document.getElementById("sent").style.textAlign = "center";
			document.getElementById( "sent" ).innerHTML = '<font style="color:#00FF00; font-size:2em;"></br>Percent Correct</br></br>' + PercentTotal.toFixed(2) + '%</font>'; 
			document.getElementById( "previous" ).innerHTML = "";
			document.getElementById( "next" ).innerHTML = "";
		} else {
		PercentTotal = (scoreKK / ScoreTotal) * 100;
		document.getElementById( "score" ).innerHTML = "Score = " + scoreKK + " | Percent Correct = " + PercentTotal.toFixed(2) + "% | Remaining questions = " + NumOfQues; 
		document.getElementById("sent").style.textAlign = "center";
		document.getElementById( "sent" ).innerHTML = '<font style="color:#00FF00; font-size:2em;"></br>Correct</br></br>+10</font>'; 
        $( '#letters li' ).each( function( i ) {
            var $$ = $( this );
            setTimeout( function() {
                $$.animate({
                    top:'+=60px'
                });
            }, i * 300 );
        });

        setTimeout( function() {
            refreshGame();
            buildGame( ++idx );
        }, 3000);
    }
	}

    function rotate( el, angle ) {
        $( el ).css({
            '-webkit-transform': 'rotate(' + angle + 'deg)',
            '-moz-transform': 'rotate(' + angle + 'deg)',
            '-ms-transform': 'rotate(' + angle + 'deg)',
            '-o-transform': 'rotate(' + angle + 'deg)',
            'transform': 'rotate(' + angle + 'deg)'
        });
    }

    buildGame( idx );
});