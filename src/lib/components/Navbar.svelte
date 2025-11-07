<script lang="ts">
	import { assets, base } from '$app/paths'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	let show = false
	let isMenuInView = false

	$: currentPath = $page.url.pathname
	$: isHomePage = currentPath === base || currentPath === base + '/'

	onMount(() => {
		const checkMenuPosition = () => {
			const menuElement = document.getElementById('menu')
			if (!menuElement) {
				isMenuInView = false
				return
			}

			const rect = menuElement.getBoundingClientRect()
			const halfScreen = window.innerHeight / 2

			// Menu is in view if its top is above half the screen
			isMenuInView = rect.top < halfScreen && rect.bottom > 0
		}

		checkMenuPosition()
		window.addEventListener('scroll', checkMenuPosition)
		window.addEventListener('resize', checkMenuPosition)

		return () => {
			window.removeEventListener('scroll', checkMenuPosition)
			window.removeEventListener('resize', checkMenuPosition)
		}
	})
</script>

<nav class="navbar navbar-expand-md navbar-light sticky-top bg-white">
	<a class="navbar-brand" href="{base}/"><img src="{assets}/img/logo.jpg" alt="logo" /></a>
	<button
		class="navbar-toggler"
		type="button"
		data-toggle="collapse"
		aria-expanded="false"
		aria-label="Toggle navigation"
		on:click={() => (show = !show)}
	>
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" class:show id="navbarsExampleDefault">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item" class:active={isHomePage && !isMenuInView}>
				<a class="nav-link" href="{base}/">Welcome</a>
			</li>
			<li class="nav-item" class:active={isHomePage && isMenuInView}>
				<a class="nav-link" href="{base}/#menu">Today's Menu</a>
			</li>
			<li class="nav-item" class:active={currentPath === base + '/about'}>
				<a class="nav-link" href="{base}/about">About us</a>
			</li>
		</ul>
	</div>
</nav>
