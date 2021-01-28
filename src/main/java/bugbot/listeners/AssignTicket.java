package bugbot.listeners;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

public class AssignTicket extends ListenerAdapter {

    @Override
    public void onMessageReceived(@NotNull MessageReceivedEvent event) {
        if(event.getTextChannel().getName().startsWith("ticket-") && !(event.getTextChannel().getName().endsWith("luna") || event.getTextChannel().getName().endsWith("conny"))) {
            if(event.getAuthor().getId().contains("265849018662387712")) {
                event.getTextChannel().getManager().setName(event.getTextChannel().getName() + "-luna").queue();
            }else if(event.getAuthor().getId().contains("524860237979582464")) {
                event.getTextChannel().getManager().setName(event.getTextChannel().getName() + "-conny").queue();
            }
        }
    }
}
