<script>
	import { Button, Divider, Menu } from '@svelteuidev/core';
</script>

<Menu>
	<Button slot="control" variant="subtle" ripple>Menu</Button>
	<Menu.Item disabled><b>Root Finding</b></Menu.Item>
	<Menu.Item><a href="/rootFinding/bisection">Bisection</a></Menu.Item>
	<Menu.Item>Gallery</Menu.Item>
</Menu>
