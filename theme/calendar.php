<?php

header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=savethis.txt");
// do your Db stuff here to get the content into $content
print "This is some text...\n";
print $content;
