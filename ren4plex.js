var ren4plex = {

    // config
    config : {
        splitChars : /[.,;!:() _+\-\[\]]/,
        separator : ' ',
        filesToParse : '([^\s]+(\.(?i)(mkv|m4v|avi|mp4|srt))$)',
        capitaliseFirstLetter : true,
        parseYear : true,
        parseEpisode: true,
        ignoreWords : [
            '','480p','720p','1080p',
            'ITA','ENG','Subs','Sub','iTALiAN','jap','ENGLiSH',
            'hdtv','BluRay','DLMux','BDMux','BRMux','DVDRip','BrRip','BdRip','x264','x265','h264','h265','xvid','MP4','WEBRIP','PROPER',
            'AC3','Mp3','aac','2CH','DTS','Dts','2HD',
            // releaser
            'TrTd_Team','HEVC','kh','iGM','GiuseppeTnT','Marco','lol','SToNeD','AlgernonWood','NovaRip','Pir8','KILLERS','ZMachine','byR02','DarkSideMux','TeRRa','FoV','IGM','SATOSHi','TLA','RiVER','oRo','by','IperB','rarbg','xXTenGXx','ASAP'
        ]
    },

    // Capitalise the first letter
    capitaliseFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    // Extract extension from filename
    getExtension: function (filename) {
        var i = filename.lastIndexOf('.');
        return (i < 0) ? '' : filename.substr(i);
    },

    // Extract episode string from word (if match)
    getEpisode: function (word, filename){

        if (filename.indexOf('lol') > -1){
            var int = parseInt(word);
            if (int > 99 && int < 9999){
                var s = Math.floor(int / 100);
                var e = int - (s * 100);
                return  's' + ('0' + s).slice(-2) + 'e' + ('0' + e).slice(-2);
            }
        }
        // x format (es. 2x11, 1X07)
        var xPos = word.toLowerCase().indexOf('x');
        if (xPos > -1){
            var s = parseInt(word.substr(0,xPos));
            var e = parseInt(word.substr(xPos + 1));
            return  's' + ('0' + s).slice(-2) + 'e' + ('0' + e).slice(-2);
        }
        // s format (es. s02e11, S01E07)
        var match = /s\d\de\d\d/i.exec(word);
        if (match){
            var s = parseInt(word.substr(1,2));
            var e = parseInt(word.substr(4,2));
            return  's' + ('0' + s).slice(-2) + 'e' + ('0' + e).slice(-2);
        }
        return '';
    },

    // Check if the word must be ignored
    isIgnored: function (word){
        word = word.toLowerCase();
        for (var i = 0; i < this.config.ignoreWords.length; i++) {
            if (this.config.ignoreWords[i].toLowerCase() === word){
                return true;
            }
        }
        return false;
    },

    // Get new filename
    getFilename: function (filename){
        // find extension
        var i = filename.lastIndexOf('.');
        var extension = (i > -1) ? filename.substr(i) : '';
        var words = i == -1 ?
            filename.split(this.config.splitChars) :
            filename.substr(0,i).split(this.config.splitChars);
        var result = '';
        var year = '';
        var episode = '';
        for (var i = 0; i < words.length; i++) {
            // word not on ignore list
            if (this.isIgnored(words[i])) continue;
            // check if is year
            if (this.config.parseYear){
                var int = parseInt(words[i]);
                if (int != NaN && int > 1900 && int <= new Date().getFullYear()){
                    year = this.config.separator + '(' + int + ')';
                    continue;
                }
            }
            // check if episode
            if (this.config.parseEpisode && episode == ''){
                episode = this.getEpisode(words[i], filename);
                if (episode != '') {
                    result += (result.length > 0 ? this.config.separator : '') + episode;
                    continue;
                }
            }
            // add word to result
            result += (result.length > 0 ? this.config.separator : '') +
            (this.config.capitaliseFirstLetter ? this.capitaliseFirstLetter(words[i]) : words[i]);
        }
        return result + year + extension;
    },

    // Parse entire directory
    parseDir: function (path, preview){
        var fs = require('fs')
        fs.readdir(path, function(err, files){
            if (err) return;
            console.log('rename files on ' + path + (preview ? ' [PREVIEW MODE]' : ''));

            // loop sui files
            files.forEach(function(file){
                var ext = ren4plex.getExtension(file);
                if (ext != '.mkv' && ext != '.m4v' && ext != '.avi' && ext != '.mp4' && ext != '.srt')return;
                var newName = this.getFilename(file);
                if (preview){
                    console.log(file + '->' + newName);
                    return;
                }
                fs.rename(path + '/' + file, path + '/' + newName, function (err) {
                    if (err) throw err;
                    console.log(file + '->' + newName);
                });
            });
        });
    }
};
module.exports = ren4plex;

// parse dir specified or '.'
ren4plex.parseDir(process.argv[2] ? process.argv[2] : '.', process.argv[3]);