package bugbot.listeners;

import bugbot.config.Config;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.kohsuke.github.GHProject;
import org.kohsuke.github.GHProjectColumn;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

public class BugHandler extends ListenerAdapter {

    @Override
    public void onMessageReceived(@NotNull MessageReceivedEvent event) {
        if (event.getMessage().getContentRaw().startsWith("//"))
            return;

        StringBuilder message = new StringBuilder();

        if (event.getTextChannel().getId().contains("771863258066845736"))
            message.append("[CANARY] ");
        else if (event.getTextChannel().getId().contains("707243949672235058"))
            message.append("[SUGGESTION] ");
        else if (event.getTextChannel().getId().contains("707243764586119248"))
            message.append("[MAIN] ");
        else
            return;

        message.append(event.getMessage().getContentDisplay());

        if (event.getTextChannel().getId().contains("771863258066845736") || event.getTextChannel().getId().contains("707243764586119248")) {
            try {
                GitHub github = new GitHubBuilder().withOAuthToken(Config.ACCESS_TOKEN, Config.ORG_NAME).build();

                List<GHProject> prs = github.getRepository("namespace-media/XPBot").listProjects().toList();
                List<GHProjectColumn> colms = prs.get(0).listColumns().toList();
                colms.get(0).createCard(
                        message.toString()
                );

            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (event.getTextChannel().getId().contains("707243949672235058")) {
            try {
                GitHub github = new GitHubBuilder().withOAuthToken(Config.ACCESS_TOKEN, Config.ORG_NAME).build();

                List<GHProject> prs = github.getRepository("namespace-media/XPBot").listProjects().toList();
                List<GHProjectColumn> colms = prs.get(1).listColumns().toList();
                colms.get(0).createCard(
                        message.toString()
                );

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        event.getMessage().addReaction(Objects.requireNonNull(event.getJDA().getEmoteById("792577321109422111"))).queue();
    }
}
