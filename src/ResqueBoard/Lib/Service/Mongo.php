<?php
/**
 * Mongo service class
 *
 * PHP version 5
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package    ResqueBoard
 * @subpackage ResqueBoard.Lib.Service
 * @author     Wan Qi Chen <kami@kamisama.me>
 * @copyright  2012-2013 Wan Qi Chen
 * @link       http://resqueboard.kamisama.me
 * @since      2.0.0
 * @license    MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

namespace ResqueBoard\Lib\Service;

use MongoDB\Client;
use MongoDB\Driver\Manager;

/**
 * Mongo service class
 *
 * @subpackage ResqueBoard.Lib.Service
 * @author     Wan Qi Chen <kami@kamisama.me>
 * @since      2.0.0
 */
class Mongo extends AbstractService
{
    public static $instance = null;

    public function __construct($settings)
    {
        parent::bootstrap();
        $t = microtime(true);

        try {
            parent::$serviceInstance[get_class()] = new Client("mongodb://localhost:27017");
        } catch (\Exception $e) {
            throw new \Exception('Unable to connect to Mongo server');
        }

        $queryTime = round((microtime(true) - $t) * 1000, 2);
        parent::logQuery(
            array(
                'command' => 'CONNECTION to ' . $settings['host'] . ':' . $settings['port'],
                'time' => $queryTime
            )
        );
        parent::$_totalTime[get_class()] += $queryTime;
        parent::$_totalQueries[get_class()]++;
    }

    public static function init($settings)
    {
        if (self::$instance === null) {
            self::$instance = new Mongo($settings);
        }

        return self::$instance;
    }
    public function selectDB($dbName){
        return parent::$serviceInstance[get_class()]->{$dbName};
    }
}
