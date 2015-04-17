# tap-behavior-in-menu
When a submenu is present the first tap on a parent item opens the submenu. Tapping it again will navigate to the parent's href.

Usage is simple, call <code>responsiveMenuInit</code> with the UL of your choice as a parameter:

<code>responsiveMenuInit($('ul.menu'));</code>

the <code>responsiveFromWidth</code> var on top can be changed as to where to target where the tap behavior should start. Default is 768 pixels(iPad portrait)

The <code>responsiveMenuInit($('ul.menu'));</code> can be called within a window resize. This makes it able to attach the behavior after the window is resized to its breaking point. But it can also be reset and nullified when the window's width becomes greater than the breaking point.
