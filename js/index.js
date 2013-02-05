var now_entries = new Array();

function search(text){
    google.feeds.findFeeds(text, findDone);
}
function findDone(result){
    // Make sure we didn't get an error.
    if (!result.error) {
        // Get content div
        var content = $('#search-result');
        var html = '<button class="btn btn-success" name="submit" id="create">opml作成</button>';
        html += '<table class="span12 table table-striped table-hover table-condensed">';
        html += '<thead><tr><th><input type="checkbox" name="all" id="all-check" /></th><th class="span10">サイト名称</th><th class="span10">サイトURL</th></tr></thead>'
        html += '<tbody>';
        for (var i = 0; i < result.entries.length; i++) {
            var entry = result.entries[i];
            var entry_title = encodeXml(entry.title);
            var entry_link = entry.link.replace(/(http.+?\/)/,"$1");
            
            html += '<tr>';
            html += '<td><input type="checkbox" name="ck-' + i + '" /></td>';
            html += '<td>' + entry_title + '</td>';
            html += '<td><a target="_blank" href="' + entry_link + '">' + entry_link + '</a></td>';
            html += '</tr>';
            now_entries[i] = new Object();
            now_entries[i] = {'entry_title' : entry_title, 'entry_link' : entry_link, 'entry_xml' : entry.url}
        }
        html += '</tbody>';
        html += '</table>';
        content.html(html);
    }  
}

function all_check(){
    if($(this).is(':checked')){
        $('.table input').attr('checked', 'checked');
    }else{
        $('.table input').removeAttr('checked');
    }
    
}

function opml_create(){
    var opml = '<?xml version="1.0" encoding="utf-8"?><opml version="2.0">';
    opml += '<head><title>rss2opml</title></head>';
    opml += '<body>';
    $('.table input:checked').each(function(){
        var id = $(this).attr('name').replace('ck-', '');
        if(id == 'all'){
            return;
        }
        
        var entry = now_entries[id];
        entry.entry_title;
        entry.entry_link;
        entry.entry_xml;
        
        
        opml += '<outline text="' + entry.entry_title + '"';
        opml += ' title="' + entry.entry_title + '"';
        opml += ' xmlUrl="' + entry.entry_xml + '"';
        opml += ' htmlUrl="' + entry.entry_link + '" />';
    });
    opml += '</body>';
    opml += '</opml>';
    $('#opml-result').text(opml);
    $('#search-modal').modal('show');
    
}

$(function(){
    $('#search').click(function(){
        search($('#serch-text').val());
        return false;
    });
    $('#all-check').live('click', all_check);
    $('#create').live('click', opml_create);
    $('#opml-result').focus(function(){
        $(this).select();
    }).click(function(){
        $(this).select();
        return false;
    })
    
});