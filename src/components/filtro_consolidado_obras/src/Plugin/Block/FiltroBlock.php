<?php

namespace Drupal\filtro_consolidado_obras\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Despliegue del bloque Prueba.
 *
 * @Block(
 *   id = "filtro_obras_block",
 *   admin_label = @Translation("Bloque Filtro Consolidado Obras"),
 *   category = @Translation("Custom"),
 * )
 */
class FiltroBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'block-filtro-consolidado-obras',
      '#markup' => $this->t('Bloque de filtro de obras'),
      '#test_var' => $this->t('Test Value')
    ];
  }
}