var Frameset = {
    frms: {},
    
    add: function(frameConfig){
        var frm = new Frame(frameConfig);
        frm.setURL();
        this.frms[frameConfig.label] = frm;
        this.attachToDOM(frm);
    },
    
    remove: function(label){
        this.detachFromDOM(label);
        delete this.frms[label];
    },
    
    clear: function(){
        this.frms = {};
    },
    
    get: function(label){
        return this.frms[label];
    },
    
    attachToDOM: function(frm){
        var frames = $("#frames");
        frames.append(frm.element);
        
        var menuUL = $("#frames-list ul");
        menuUL.append(frm.menu);
    },
    
    detachFromDOM: function(label){
        var frm = $("#frames #wrpr_" + label);
        frm.remove();
    },
    
    orientationToggle: function(){
        for(idx in this.frms){
            this.frms[idx].toggleOrientation();
        }
    },
    
    getOrientation: function(){
        if(this.frms[[Object.keys(this.frms)[0]]].element.find("iframe").width() > this.frms[[Object.keys(this.frms)[0]]].element.find("iframe").height()){
            return 'landscape';
        }
        
        return 'portrait';
    },
    
    setURL: function(){
        for(idx in this.frms){
            this.frms[idx].setURL();
        }
    }
}

var Frame = function(frameConfig){
    //Each frame will have a menu item and a frame in the main UI
    var getHashParams = function getHashParams() {
        var hashParams = {};
        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
            q = window.location.hash.substring(1);

        while (e = r.exec(q))
           hashParams[d(e[1])] = d(e[2]);

        return hashParams;
    }
    
    this.setElement = function(ele){
        this.element = ele;
    };
    
    this.setMenu = function(ele){
        this.menu = ele;
    };
    
    this.toggleOrientation = function(){
        var w = this.element.find("iframe").width();
        var h = this.element.find("iframe").height();
        
        this.element.find("iframe").width(h);
        this.element.find("iframe").height(w);
    };
    
    this.toggleVisible = function(){
        var frm = this;
    
        this.element.toggle(
            100,
            function(){
                $(this).css("overflow", "visible");
               
                if(frm.element.is(":visible")){
                    frm.menu.addClass("active");
                } else {
                    frm.menu.removeClass("active");
                }  
            }
        );
    };
    
    this.setURL = function(){
        this.element.find("iframe").attr("src", getHashParams().url);
    }
    
    this.setElement(this.makeElement(frameConfig));
    this.setMenu(this.makeMenu(frameConfig));
}

Frame.prototype.makeElement = function(conf, orientation){
    if(orientation == null){
        orientation = 'portrait';
    }
    
    var getEffectiveSize = function getEffectiveSize(dim, dpr){
        if (typeof dpr === 'undefined' || +dpr === 0) {
            throw Exception("DPR mnust be define and be non zero");
        }
        
        var effectiveDimension = dim/dpr;
        return Math.ceil(effectiveDimension);
    }
    
    var wrapper = $("<div>");
    wrapper.attr("class", "wrapper");
    wrapper.attr("id", "wrpr_" + conf.label);
    
    var header = $("<h3>");
    header.text(conf.label);
    wrapper.append(header);
    
    var size = $("<div>");
    size.html("Size - " + conf.w + " x " + conf.h + " DPR: " + conf.dpr + "<br />Effective Size - " + getEffectiveSize(conf.w, conf.dpr) + " x " + getEffectiveSize(conf.h, conf.dpr));
    size.attr("class", "size");
    wrapper.append(size);
    
    var ifr = $("<iframe>");
    ifr.attr("id", "ifr_" + conf.label);
    
    ifr.attr("frameborder", 0);
    
    if(orientation == 'portrait'){
        ifr.width(getEffectiveSize(conf.w, conf.dpr));
        ifr.height(getEffectiveSize(conf.h, conf.dpr));
    } else {
        ifr.height(getEffectiveSize(conf.w, conf.dpr));
        ifr.width(getEffectiveSize(conf.h, conf.dpr));
    }
    
    wrapper.append(ifr);
    
    return wrapper;
};

Frame.prototype.makeMenu = function(conf){
    var li = $("<li>");
    li.attr("id", "li_" + conf.label);
    li.attr("data-label", conf.label);
    li.addClass("active");
    
    var a = $("<a>");
    a.text(conf.label);
    
    li.append(a);
    
    li.bind("click", function(event, timeline){
        Frameset.get(conf.label).toggleVisible();
    });
    
    return li;
};