<script lang="ts">
	import { assets } from '$app/paths'
</script>

<div class="maincontent">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="display-4 text-center">Welcome to Bistro Delivery</h1>

				<div class="featured-img mt-5 mb-5">
					<img src="{assets}/img/featured.jpg" alt="Elegant French Cuisine" />
				</div>

				<article class="article">
					<p>
						Welcome to <strong>Bistro Delivery</strong>, where the elegance of French &amp; Italian
						cuisine meets the convenience of your doorstep. Imagine the delicate flavors of Paris,
						the rustic charm of Naples, and the chic sophistication of Lyon, all wrapped up in a
						single click.
					</p>

					<p>
						But here's a little secret: while we dream of pizzas, coq au vin, and crème brûlée, our
						true passion lies in the art of seamless software testing.
					</p>

					<p>
						<strong>Bistro Delivery</strong> is not just a culinary journey; it's a showcase of what
						<a href="https://qasphere.com" target="_blank">QA Sphere</a> can do for web applications
						just like this one. We've cooked up this example to demonstrate how our Test Management System
						(TMS) can handle the heat of the digital kitchen, ensuring every order is delivered with
						perfection.
					</p>

					<p>
						Behind the scenes, our team at <strong>QA Sphere</strong> relishes good food as much as
						anyone. But more than that, we savor the process of making software more reliable, one
						test at a time. Consider <strong>Bistro Delivery</strong> our way of showing you how we blend
						the precision of quality assurance with the flair of French dining. This example might be
						whimsical, but our commitment to enhancing your QA process is as serious as a Michelin star.
					</p>

					<p>
						So, while you won't actually be able to order your favorite quiche or ratatouille from
						us, you can certainly rely on <strong>QA Sphere</strong> to deliver the tools and
						systems you need to ensure your software projects are a recipe for success.
						<em>Bon appétit</em> and happy testing!
					</p>
				</article>
			</div>
		</div>
	</div>
</div>

<style>
	.featured-img img {
		max-width: 50%;
		height: auto;
		display: block;
		margin: 0 auto;
		border-radius: 20px;
		border: 8px solid #f8f9fa;
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.15),
			0 0 0 1px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.featured-img img:hover {
		transform: translateY(-5px);
		box-shadow:
			0 15px 40px rgba(0, 0, 0, 0.2),
			0 0 0 1px rgba(0, 0, 0, 0.05);
	}
</style>
