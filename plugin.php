<?php
/*
Plugin Name: Gas Cost Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/gas-cost-calculator/
Description: This free gasoline cost calculator evaluates the fuel cost of a journey using several units of measurement depending on fuel efficiency, distance, and gas price.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_gas_cost_calculator
*/

if (!function_exists('add_shortcode')) die("No direct call");

function display_ci_gas_cost_calculator(){
    $page = 'index.html';
    return '<h2><a href="https://www.calculator.io/gas-cost-calculator/" target="_blank"><img src="' . plugins_url('assets/images/icon-48.png', __FILE__ ) . '" width="48" height="48"></a> Gas Cost Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . plugins_url($page, __FILE__ ) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_gas_cost_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_gas_cost_calculator', 'display_ci_gas_cost_calculator' );