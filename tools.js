var config = require('./config');

var tools = {

    parseFilenameOld: function (filename){
        var i = filename.lastIndexOf('.');
        if (i == -1) return filename;
        var extension = filename.substr(i);
        var filename = filename
            .substring(0, i)
            .replace(/DD5.1/gi,"")
            .replace(/\./g," ")
            .replace(/-TrTd_Team/gi,"")
            .replace(/_/g," ")
            .replace(/ - /g," ")
            .replace(/720p/gi,"")
            .replace(/1080p/gi,"")
            .replace(/x264/gi,"")
            .replace(/x265/gi,"")
            .replace(/HEVC/gi,"")
            .replace(/h264/gi,"")
            .replace(/h265/gi,"")
            .replace(/xvid/gi,"")
            .replace(/HDTV/gi,"")
            .replace(/BDMux/gi,"")
            .replace(/DLMux/gi,"")
            .replace(/ITA-ENG/gi,"")
            .replace(/S01E/gi,"1x")
            .replace(/S02E/gi,"2x")
            .replace(/S03E/gi,"3x")
            .replace(/S04E/gi,"4x")
            .replace(/S05E/gi,"5x")
            .replace(/S06E/gi,"6x")
            .replace(/S07E/gi,"7x")
            .replace(/S08E/gi,"8x")
            .replace(/S09E/gi,"9x")
            .replace(/iTALiAN/gi,"")
            .replace(/Sub /gi,"")
            .replace(/ ITA /gi,"")
            .replace(/(ITA )/gi,"")
            .replace(/Ita-Jap/gi,"")
            .replace(/ ENG /gi,"")
            .replace(/AC3/gi,"")
            .replace(/aac/gi,"")
            .replace(/Mp3/gi,"")
            .replace(/2CH/g,"")
            .replace(/DTS/gi,"")
            .replace(/ ENG /gi,"")
            .replace(/AAC 5 1/gi,"")
            .replace(/BluRay/gi,"")
            .replace(/DVDRip/gi,"")
            .replace(/BrRip/gi,"")
            .replace(/BdRip/gi,"")
            .replace(/WEB-DLMUX/gi,"")
            .replace(/WEBRIP/gi,"")
            .replace(/REPACK/gi,"")
            .replace(/BRMux/gi,"")
            .replace(/DVDMux/gi,"")
            .replace(/-SToNeD/g,"")
            .replace(/-AlgernonWood/g,"")
            .replace(/by Alex950/g,"")
            .replace(/-NovaRip/g,"")
            .replace(/-Pir8/g,"")
            .replace(/-KILLERS/g,"")
            .replace(/ZMachine/g,"")
            .replace(/ ENGLiSH /gi,"")
            .replace(/by cpt/g,"")
            .replace(/by okuto/g,"")
            .replace(/by IperB/g,"")
            .replace(/byR02/g,"")
            .replace(/-DarkSideMux/g,"")
            .replace(/-TeRRa/g,"")
            .replace(/-FoV/g,"")
            .replace(/AlgernonWood/g,"")
            .replace(/-IGM/g,"")
            .replace(/-TLA/g,"")
            .replace(/-SATOSHi/g,"")
            .replace(/-Pelle/g,"")
            .replace(/-RiVER/g,"")
            .replace(/-NR/gi,"")
            .replace(/-BLUWORLD/g,"")
            .replace(/-GiuseppeTnT/gi,"")
            .replace(/-LOL/gi,"")
            .replace(/MP4-oRo/gi,"")
            .replace(/XXX/gi,"")
            .replace(/-TRL/g,"")
            .replace(/\+GiuseppeTnT/gi,"")
            .replace(/-iGM/g,"")
            .replace(/IGS/g,"")
            .replace(/ 2010 /gi," (2010)")
            .replace(/ 2011 /gi," (2011)")
            .replace(/ 2012 /gi," (2012)")
            .replace(/ 2013 /gi," (2013)")
            .replace(/ 2014 /gi," (2014)")
            .replace(/ 2015 /gi," (2015)")
            .replace(/\[TELEFILM\]/gi,"")
            .replace(/\[rarbg\]/gi,"")
            .replace(/\[ mp3 ita\]/gi,"")
            .replace(/Subs/gi,"")
            .replace(/\(ita\)/gi,"")
            .replace(/AACSubs/gi,"")
            .replace(/WEB-DL/gi,"")
            .replace(/\[\]/gi,"")
            .replace(/\[ \]/gi,"")
            .replace(/\[ Mp3\]/gi,"")
            .replace(/\(\)/gi,"")
            .trim()
            .replace( /\s\s+/g," ");
        return filename + extension;
    },

    capitaliseFirstLetter: function(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    getExtension: function (filename) {
        var i = filename.lastIndexOf('.');
        return (i < 0) ? '' : filename.substr(i);
    },

    parseFilename: function (filename){
        // find extension
        var i = filename.lastIndexOf('.');
        var extension = (i > -1) ? filename.substr(i) : '';
        var worlds = i == -1 ?
            filename.split(config.splitChars) :
            filename.substr(0,i).split(config.splitChars);
        var result = '';
        var year = '';
        for (var i = 0; i < worlds.length; i++) {
            // word not on ignore list
            if (config.ignoreWords.indexOf(worlds[i]) != -1) continue;
            // check if is year
            if (config.parseYear){
                var int = parseInt(worlds[i]);
                if (int != NaN && int > 1900 && int <= new Date().getFullYear()){
                    year = config.separator + '(' + int + ')';
                    continue;
                }
            }
            result += (result.length > 0 ? config.separator : '') +
            (config.capitaliseFirstLetter ? this.capitaliseFirstLetter(worlds[i]) : worlds[i]);
        }
        return result + year + extension;
    }

};

module.exports = tools;