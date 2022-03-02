import { Module } from '@nestjs/common';
import { appInitAction } from '@module/core/store/actions';
import { CORE_EFFECTS } from '@module/core/store/effects';
import { StateManager } from '@module/core/provider/state-manager';
import { ConfigModule } from '@nestjs/config';
import rabbitmqCfg from '@cfg/rabbitmq.cfg';
import databaseCfg from '@cfg/database.cfg';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqCfg, databaseCfg],
    }),
  ],
  providers: [StateManager],
  exports: [StateManager],
})
export class CoreModule {
  constructor(protected stateManager: StateManager) {
    this.stateManager.getStoreManager().addEpics('core', [...CORE_EFFECTS]);
    this.stateManager.getStore().dispatch(appInitAction.ACTION());
  }
}
