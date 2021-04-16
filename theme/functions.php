<?php

/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if (!class_exists('Timber')) {

	add_action(
		'admin_notices',
		function () {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function ($template) {
			return dirname(get_stylesheet_directory()) . '/static/no-timber.html';
		}
	);
	return;
}

Timber::$dirname = array('../views');
Timber::$autoescape = false;

function mk_add_custom_post_counts()
{
	$post_types = array("event");
	foreach ($post_types as $pt) :
		$pt_info = get_post_type_object($pt);
		$num_posts = wp_count_posts($pt);
		$num = number_format_i18n($num_posts->publish);
		$text = _n($pt_info->labels->singular_name, $pt_info->labels->name, intval($num_posts->publish)); // singular/plural text label for CPT
		echo '<li class="page-count ' . $pt_info->name . '-count"><a href="edit.php?post_type=' . $pt . '">' . $num . ' ' . $text . '</a></li>';
	endforeach;
}

function mk_remove_wp_css()
{
	wp_deregister_style('wp-block-library');
	wp_deregister_script('jquery');
	wp_deregister_script('devicepx');
}

class NDIASite extends Timber\Site
{
	/** Add timber support. */
	public function __construct()
	{
		add_action('after_setup_theme', array($this, 'theme_supports'));
		add_filter('timber/context', array($this, 'add_to_context'));
		add_filter('timber/twig', array($this, 'add_to_twig'));
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));

		add_action('wp_print_styles', 'mk_remove_wp_css');
		add_action('dashboard_glance_items', 'mk_add_custom_post_counts');
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('wp_print_styles', 'print_emoji_styles');

		parent::__construct();
	}
	public function register_post_types()
	{
	}
	public function register_taxonomies()
	{
	}

	public function add_to_context($context)
	{
		$eventArgs = array(
			'post_type' => 'event',
			'post_status' => 'publish',
			'meta_key' => 'start',
			'orderby' => 'meta_value_datetime'
		);
		$future_event_args = array(
			'post_type' => 'event',
			'post_status' => 'publish',
			'meta_key' => 'start',
			'meta_value'   => date("Y-m-d H:i:s"),
			'meta_compare' => '>',
			'orderby' => 'meta_value_datetime'
		);
		$past_event_args = array(
			'post_type' => 'event',
			'post_status' => 'publish',
			'meta_key' => 'end',
			'meta_value'   => date("Y-m-d H:i:s"),
			'meta_compare' => '<',
			'orderby' => 'meta_value_datetime'
		);
		$resourceArgs = array(
			'post_type' => 'resource',
			'post_status' => 'publish',
		);
		$resource_terms = get_terms(array(
			'taxonomy' => 'resource_group',
			'hide_empty' => false,
		));

		$context['events'] = Timber::get_posts($eventArgs);
		$context['future_events'] = Timber::get_posts($future_event_args);
		$context['past_events'] = Timber::get_posts($past_event_args);
		$context['resources'] = Timber::get_posts($resourceArgs);
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
		$context['is_home']  = is_front_page();
		$context['setting_font_size']  = isset($_COOKIE["font-size"]) ? $_COOKIE["font-size"] : "medium";
		$context['setting_spacing']  = isset($_COOKIE["spacing"]) ? $_COOKIE["spacing"]: "medium";
		$context['setting_colour']  =  isset($_COOKIE["colour"]) ? $_COOKIE["colour"]: "light-contrast";
		$context['resource_terms']  = $resource_terms;

		return $context;
	}

	public function theme_supports()
	{
		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);
		add_theme_support('menus');
	}

	public function add_to_twig($twig)
	{
		$twig->addExtension(new Twig\Extension\StringLoaderExtension());
		return $twig;
	}
}

new NDIASite();
